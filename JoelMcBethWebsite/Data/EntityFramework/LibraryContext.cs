namespace JoelMcBethWebsite.Data.EntityFramework
{
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class LibraryContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }

        public LibraryContext(DbContextOptions<LibraryContext> options) :
            base(options)
        {            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                .HasKey(c => c.Isbn);

            modelBuilder.Entity<BookAuthor>()
                .HasKey(c => new { c.BookId, c.AuthorId });              
        }
    }
}
