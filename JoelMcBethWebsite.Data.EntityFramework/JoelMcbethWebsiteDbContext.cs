namespace JoelMcBethWebsite.Data.EntityFramework
{
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class JoelMcbethWebsiteDbContext : DbContext
    {
        public JoelMcbethWebsiteDbContext(DbContextOptions<JoelMcbethWebsiteDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<TaskCount> TaskCounts { get; set; }

        public DbSet<Book> Books { get; set; }

        public DbSet<BookReview> BookReviews { get; set; }

        public DbSet<Author> Authors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("User");

            modelBuilder.Entity<Book>(bk =>
            {
                bk.HasKey(bkk => bkk.Id);
                bk.ToTable("Books");
                bk.HasMany(bk1 => bk1.Authors)
                    .WithMany(bk2 => bk2.Books)
                //.UsingEntity(ent =>
                //{
                //    ent.ToTable("BookAuthors");
                //    ent.Property<int>("BookId");
                //    ent.Property<int>("AuthorId");
                //    ent.HasKey("BookId", "AuthorId");

                //    //ent.HasOne(typeof(Book)).WithMany().HasForeignKey("BookId");
                //    //ent.HasOne(typeof(Author)).WithMany().HasForeignKey("AuthorId");
                //});
                .UsingEntity<BookAuthor>(
                    le => le.HasOne(x => x.Author).WithMany().HasForeignKey(y => y.AuthorId),
                    re => re.HasOne(x => x.Book).WithMany().HasForeignKey(y => y.BookId),
                    ce => ce.ToTable("BookAuthors"));

                //              .UsingEntity<Dictionary<string, object>>("Publications",
                //x => x.HasOne<Book>().WithMany().HasForeignKey(nameof(Book.BookId)),
                //y => y.HasOne<Author>().WithMany().HasForeignKey(nameof(Author.AuthorId)),
                //z => z.ToTable("Publications"));
                //bk.HasMany(bk1 => bk1.Authors)                    
                //    .wi
            });

            //modelBuilder.Entity<Book>()
            //    .HasMany(bk => bk.Authors)
                

            modelBuilder.Entity<BookReview>(br =>
            {
                br.HasKey(bkk => bkk.Id);
                br.Property(brp => brp.Rating).HasColumnType("tinyint");

                br.ToTable("BookReviews");
            });

            modelBuilder.Entity<Author>(at =>
            {                
                at.ToTable("Authors");
                
            });
        }
    }
}
