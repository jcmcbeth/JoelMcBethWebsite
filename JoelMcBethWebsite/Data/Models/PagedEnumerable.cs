namespace JoelMcBethWebsite.Data.Models
{
    using System.Collections.Generic;

    public class PagedEnumerable<T>
    {
        public PagedEnumerable(IEnumerable<T> data, Pagination pagination)
        {
            this.Data = data;
            this.Pagination = pagination;
        }

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
    }
}
