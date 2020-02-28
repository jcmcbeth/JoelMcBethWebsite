namespace JoelMcBethWebsite.Scheduler
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class Schedule
    {
        public Type ScheduledJobType { get; set; }

        public int Interval { get; set; }
    }
}
