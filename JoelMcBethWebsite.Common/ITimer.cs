namespace JoelMcBethWebsite
{
    using System;

    public interface ITimer
    {
        bool Change(TimeSpan dueTime, TimeSpan period);

        bool Change(int dueTime, int period);
    }
}
