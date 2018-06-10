using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JoelMcBethWebsite.Data.Models
{
    public class PagedEnumerable<T>
    {
        public const int DefaultPageSize = 10;

        public IEnumerable<T> Data
        {
            get;
            set;
        }

        public Pagination Pagination
        {
            get;
            set;
        }

        public PagedEnumerable(IEnumerable<T> data, int page, int pageSize = DefaultPageSize)
        {
            int count = data.Count();

            this.Pagination = new Pagination()
            {
                Count = count,
                Page = page,
                PageSize = pageSize,
                Pages = (int)Math.Ceiling(count / (double)pageSize)
            };

            this.Data = data.Skip((page - 1) * pageSize).Take(pageSize);
        }
    }
}
