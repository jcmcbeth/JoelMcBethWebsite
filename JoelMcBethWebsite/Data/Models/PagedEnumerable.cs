using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JoelMcBethWebsite.Data.Models
{
    public class PagedEnumerable<T>
    {
        public IEnumerable<T> Data
        {
            get;
            private set;
        }

        public Pagination Pagination
        {
            get;
            private set;
        }

        public PagedEnumerable(IEnumerable<T> data, Pagination pagination)
        {
            this.Data = data;
            this.Pagination = pagination;
        }
    }
}
