using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JoelMcBethWebsite.Data.Models
{
    public class Pagination
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }
        public int Pages { get; set; }
    }
}
