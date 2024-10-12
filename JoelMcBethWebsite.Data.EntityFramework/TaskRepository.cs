namespace JoelMcBethWebsite.Data.EntityFramework
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;

    public class TaskRepository : ITaskRepository
    {
        private readonly JoelMcbethWebsiteDbContext context;

        public TaskRepository(JoelMcbethWebsiteDbContext context)
        {
            this.context = context;
        }

        public async Task<TaskCount> AddTaskCountAsync(TaskCount taskCount, CancellationToken cancellationToken = default)
        {
            this.context.TaskCounts.Add(taskCount);
            await this.context.SaveChangesAsync(cancellationToken);

            return taskCount;
        }

        public Task<List<TaskCount>> GetTaskCountsAsync(CancellationToken cancellationToken = default)
        {
            throw new System.NotImplementedException();
        }
    }
}
