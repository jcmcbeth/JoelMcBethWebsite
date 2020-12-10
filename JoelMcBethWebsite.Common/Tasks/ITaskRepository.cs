namespace JoelMcBethWebsite.Tasks
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;

    public interface ITaskRepository
    {
        Task<List<TaskCount>> GetTaskCountsAsync(CancellationToken cancellationToken = default);

        Task<TaskCount> AddTaskCountAsync(TaskCount taskCount, CancellationToken cancellationToken = default);
    }
}
