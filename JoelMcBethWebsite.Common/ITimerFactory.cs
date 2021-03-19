namespace JoelMcBethWebsite
{
    using System;
    using System.Threading;

    public interface ITimerFactory
    {
        ITimer Create(TimerCallback callback, TimeSpan dueTime, TimeSpan period);

        void Destroy(ITimer timer);
    }
}
