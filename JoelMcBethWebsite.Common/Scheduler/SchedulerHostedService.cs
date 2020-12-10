namespace JoelMcBethWebsite.Scheduler
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    public class SchedulerHostedService : IHostedService
    {
        private readonly IDateTimeProvider dateTimeProvider;
        private readonly List<ScheduledJob> scheduledJobs;
        private readonly IServiceProvider serviceProvider;

        private Task executingTask;
        private CancellationTokenSource cancellationTokenSource;

        public SchedulerHostedService(
            IEnumerable<Schedule> schedules,
            IServiceProvider serviceProvider,
            IDateTimeProvider dateTimeProvider)
        {
            if (schedules == null)
            {
                throw new ArgumentNullException(nameof(schedules));
            }

            this.dateTimeProvider = dateTimeProvider ?? throw new ArgumentNullException(nameof(dateTimeProvider));
            this.serviceProvider = serviceProvider;
            this.scheduledJobs = new List<ScheduledJob>();

            foreach (var schedule in schedules)
            {
                var scheduledJob = new ScheduledJob()
                {
                    Schedule = schedule,
                    ExecutionTime = this.dateTimeProvider.UtcNow
                };

                this.scheduledJobs.Add(scheduledJob);
            }
        } 

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            this.cancellationTokenSource = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);

            while (!cancellationToken.IsCancellationRequested)
            {
                this.executingTask = this.ExecuteAsync(cancellationToken);
                await Task.Delay(TimeSpan.FromMinutes(10), cancellationToken);
                //await Task.Delay(TimeSpan.FromMinutes(1), cancellationToken);
            }
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            if (this.executingTask == null)
            {
                return;
            }

            this.cancellationTokenSource.Cancel();

            await Task.WhenAny(this.executingTask, Task.Delay(-1, cancellationToken));

            cancellationToken.ThrowIfCancellationRequested();
        }

        private async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            var now = this.dateTimeProvider.UtcNow;

            var executingJobs = this.scheduledJobs.Where(sj => sj.ExecutionTime < now);

            foreach (var executingJob in executingJobs)
            {
                executingJob.ExecutionTime = now.AddSeconds(executingJob.Schedule.Interval);
                //executingJob.ExecutionTime = now.AddMinutes(executingJob.Schedule.Interval);

                using (var scope = this.serviceProvider.CreateScope())
                {
                    try
                    {
                        var schedulerJob = (ISchedulerJob)scope.ServiceProvider.GetRequiredService(
                            executingJob.Schedule.ScheduledJobType);

                        await Task.Factory.StartNew(
                            () => schedulerJob.ExecuteAsync(cancellationToken),
                            cancellationToken);
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }
        }

        private class ScheduledJob
        {
            public Schedule Schedule { get; set; }

            public DateTime ExecutionTime { get; set; }
        }
    }
}
