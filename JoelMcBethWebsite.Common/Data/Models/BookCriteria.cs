namespace JoelMcBethWebsite.Data.Models
{
    public class BookCriteria
    {
        public const SortDirection DefaultSortDiection = SortDirection.Ascending;
        public const BookSort DefaultSort = BookSort.None;
        public const int DefaultPageSize = 15;

        public BookCriteria()
        {
            this.Page = 1;
            this.PageSize = DefaultPageSize;
            this.Sort = DefaultSort;
            this.SortDirection = DefaultSortDiection;
        }

        public int Page
        {
            get;
            set;
        }

        public int PageSize
        {
            get;
            set;
        }

        public BookSort Sort
        {
            get;
            set;
        }

        public SortDirection SortDirection
        {
            get;
            set;
        }

        public string FilterText
        {
            get;
            set;
        }
    }
}
