namespace JoelMcBethWebsite.Data.EntityFramework
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Tasks;
    using Microsoft.EntityFrameworkCore;

    public class EntityFrameworkTaskRepository : ITaskRepository
    {
        private readonly JoelMcbethWebsiteDbContext context;

        public EntityFrameworkTaskRepository(JoelMcbethWebsiteDbContext context)
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
            return this.context.TaskCounts.ToListAsync(cancellationToken);
        }
    }
}
