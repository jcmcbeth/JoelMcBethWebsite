namespace JoelMcBethWebsite.Data.Models
{
    public class BookAuthor
    {
        public string BookId { get; set; }
        public int AuthorId { get; set; }
        public Book Book { get; set; }
        public Author Author { get; set; }
    }
}
