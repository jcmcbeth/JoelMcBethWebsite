namespace JoelMcBethWebsite
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTime UtcNow { get => DateTime.Now; }
    }
}
