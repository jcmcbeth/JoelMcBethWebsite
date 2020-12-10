namespace JoelMcBethWebsite.Tasks
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Scheduler;

    public class TaskCountSchedulerJob : ISchedulerJob
    {
        private readonly ITaskClient client;
        private readonly ITaskRepository repository;
        private readonly IDateTimeProvider dateTimeProvider;

        public TaskCountSchedulerJob(ITaskClient client, ITaskRepository repository, IDateTimeProvider dateTimeProvider)
        {
            this.client = client;
            this.repository = repository;
            this.dateTimeProvider = dateTimeProvider;
        }

        public async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            var tasks = await this.client.GetTasksAsync(cancellationToken);

            int count = tasks.Count;

            var taskCount = new TaskCount()
            {
                Count = count,
                Timestamp = this.dateTimeProvider.UtcNow
            };

            await this.repository.AddTaskCountAsync(taskCount, cancellationToken);
        }
    }
}
