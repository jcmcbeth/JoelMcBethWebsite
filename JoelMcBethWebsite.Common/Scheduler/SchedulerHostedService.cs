namespace JoelMcBethWebsite.Scheduler
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    public class SchedulerHostedService : IHostedService, IDisposable
    {
        private readonly IDateTimeProvider dateTimeProvider;
        private readonly List<ScheduledJob> scheduledJobs;
        private readonly IServiceProvider serviceProvider;

        private Task executingTask;
        private CancellationTokenSource cancellationTokenSource;

        private bool isDisposed;

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

        public Task StartAsync(CancellationToken cancellationToken)
        {
            this.cancellationTokenSource = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);

            this.executingTask = this.ExecuteAsync(this.cancellationTokenSource.Token);

            if (this.executingTask.IsCompleted)
            {
                return this.executingTask;
            }

            return Task.CompletedTask;           
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            if (this.executingTask == null)
            {
                return;
            }

            try
            {
                this.cancellationTokenSource.Cancel();
            }
            finally
            {
                await Task.WhenAny(this.executingTask, Task.Delay(Timeout.Infinite, cancellationToken));
            }            
        }

        public void Dispose()
        {
            this.Dispose(disposing: true);

            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!isDisposed)
            {
                if (disposing)
                {
                    this.cancellationTokenSource.Cancel();
                }

                this.isDisposed = true;
            }
        }

        private async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                await this.ExecuteJobsAsync(cancellationToken);
                //await Task.Delay(TimeSpan.FromMinutes(10), cancellationToken);
                await Task.Delay(TimeSpan.FromMinutes(1), cancellationToken);
            }
        }

        private async Task ExecuteJobsAsync(CancellationToken cancellationToken)
        {
            var now = this.dateTimeProvider.UtcNow;

            var executingJobs = this.scheduledJobs.Where(sj => sj.ExecutionTime < now);

            foreach (var executingJob in executingJobs)
            {
                executingJob.ExecutionTime = now.AddSeconds(executingJob.Schedule.Interval);
                //executingJob.ExecutionTime = now.AddMinutes(executingJob.Schedule.Interval);

                await Task.Factory.StartNew(async () =>
                {
                    using (var scope = this.serviceProvider.CreateScope())
                    {
                        var schedulerJob = (ISchedulerJob)scope.ServiceProvider.GetRequiredService(
                            executingJob.Schedule.ScheduledJobType);

                        await schedulerJob.ExecuteAsync(cancellationToken);
                    }
                });                
            }
        }

        private class ScheduledJob
        {
            public Schedule Schedule { get; set; }

            public DateTime ExecutionTime { get; set; }
        }
    }
}
