namespace JoelMcBethWebsite.Scheduler
{
    using System;

    public class Schedule
    {
        public Type ScheduledJobType { get; set; }

        /// <summary>
        /// Interval in minutes.
        /// </summary>
        public int Interval { get; set; }
    }
}
