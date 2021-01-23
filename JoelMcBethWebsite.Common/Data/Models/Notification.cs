using System;
using System.Collections.Generic;
using System.Text;

namespace JoelMcBethWebsite.Data.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Message { get; set; }

        public IEnumerable<User> Users { get; set; }
    }
}
