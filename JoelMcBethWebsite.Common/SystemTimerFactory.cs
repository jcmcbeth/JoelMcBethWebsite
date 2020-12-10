namespace JoelMcBethWebsite
{
    using System;
    using System.Threading;

    public class SystemTimerFactory : ITimerFactory
    {
        public ITimer Create(TimerCallback callback, TimeSpan dueTime, TimeSpan period)
        {
            var timer = new Timer(callback, null, dueTime, period);

            return new SystemTimer(timer);
        }

        public void Destroy(ITimer timer)
        {
            if (timer != null && timer is IDisposable disposableTimer)
            {
                disposableTimer.Dispose();
            }
        }
    }
}
