namespace JoelMcBethWebsite.Data.Models
{
    using System.Collections.Generic;

    public class PagedEnumerable<T>
    {
        public PagedEnumerable(IEnumerable<T> items, Pagination pagination)
        {
            this.Items = items;
            this.Pagination = pagination;
        }

        public IEnumerable<T> Items
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
