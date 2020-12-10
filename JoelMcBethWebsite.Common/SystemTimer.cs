namespace JoelMcBethWebsite
{
    using System;
    using System.Threading;

    public class SystemTimer : ITimer, IDisposable
    {
        private readonly Timer timer;
        private bool isDisposed;

        public SystemTimer(Timer timer)
        {
            this.timer = timer ?? throw new ArgumentNullException(nameof(timer));
        }

        public bool Change(TimeSpan dueTime, TimeSpan period)
        {
            return this.timer.Change(dueTime, period);
        }

        public bool Change(int dueTime, int period)
        {
            return this.timer.Change(dueTime, period);
        }

        public void Dispose()
        {
            this.Dispose(disposing: true);

            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.isDisposed)
            {
                if (disposing)
                {
                    this.timer.Dispose();
                }

                this.isDisposed = true;
            }
        }        
    }
}
