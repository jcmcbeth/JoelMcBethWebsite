namespace JoelMcBethWebsite.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class Project
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Uri GitHubUrl { get; set; }
        public Uri Url { get; set; }
    }
}
