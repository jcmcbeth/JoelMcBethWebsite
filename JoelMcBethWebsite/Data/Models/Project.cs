namespace JoelMcBethWebsite.Data.Models
{
    using System;

    public class Project
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public Uri GitHubUrl { get; set; }

        public Uri Url { get; set; }
    }
}
