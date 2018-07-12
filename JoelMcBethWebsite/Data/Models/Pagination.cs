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

        public Pagination() : this(1, 15, 0)
        {
        }

        public Pagination(int page, int pageSize, int count)
        {
            this.Page = page;
            this.PageSize = pageSize;
            this.Count = count;
            this.Pages = (int)Math.Ceiling(this.Count / (double)this.PageSize);
        }
    }
}
