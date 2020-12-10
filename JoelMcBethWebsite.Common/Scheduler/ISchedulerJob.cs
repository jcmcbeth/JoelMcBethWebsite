namespace JoelMcBethWebsite.Scheduler
{
    using System.Threading;
    using System.Threading.Tasks;

    public interface ISchedulerJob
    {
        Task ExecuteAsync(CancellationToken token);
    }
}
