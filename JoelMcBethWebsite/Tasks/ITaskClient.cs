namespace JoelMcBethWebsite.Tasks
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;

    public interface ITaskClient
    {
        Task<List<TodoTask>> GetTasksAsync(CancellationToken cancellationToken = default);
    }
}
