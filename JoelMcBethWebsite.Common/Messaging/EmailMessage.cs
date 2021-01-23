namespace JoelMcBethWebsite.Messaging
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class EmailMessage
    {
        public string To { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }

        public EmailFormat Format { get; set; }
    }
}
