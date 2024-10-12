namespace JoelMcBethWebsite.Data.EntityFramework
{
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Hosting;

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

        public DbSet<Media> Media { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(ent => ent.UserName)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(ent => ent.Email)
                    .IsRequired()
                    .HasMaxLength(75);
                entity.Property(ent => ent.IsApproved)
                    .HasDefaultValue(false);                
                entity.Property(ent => ent.FailedLoginAttempts)
                    .HasDefaultValue(0);
                entity.Property(ent => ent.IsLocked)
                    .HasDefaultValue(false);
                entity.Property(ent => ent.LastLoginAttempt);
            });                

            modelBuilder.Entity<Media>(entity =>
            {
                entity.HasIndex(ent => ent.Title)
                    .HasDatabaseName("IX_Media_Title");

                entity.Property(ent => ent.Title)
                    .IsRequired();
                entity.Property(med => med.Year)
                    .HasColumnType("SMALLINT");
                entity.Property(ent => ent.MediaType)
                    .IsRequired();                
                entity.Property(ent => ent.Medium)
                    .IsRequired();
            });

            modelBuilder.Entity<TaskCount>();

            modelBuilder.Entity<Author>(entity =>
            {
                entity.Property(ent => ent.FirstName)
                    .HasMaxLength(64);
                entity.Property(ent => ent.LastName)
                    .HasMaxLength(64);
                entity.Property(ent => ent.MiddleName)
                    .HasMaxLength(64);
            });

            modelBuilder.Entity<Book>(entity =>
            {
                entity.Property(ent => ent.Isbn13)
                    .HasMaxLength(13);
                entity.Property(ent => ent.Title)
                    .HasMaxLength(128)
                    .IsRequired();
                entity.Property(ent => ent.Edition)
                    .HasMaxLength(64);

                entity
                    .HasMany(ent => ent.Authors)
                    .WithMany(ent => ent.Books)
                    .UsingEntity(ent =>
                    {
                        ent.ToTable("BookAuthors");
                    });
            });                

            modelBuilder.Entity<BookReview>(br =>
            {
                br.Property(brp => brp.Rating)
                    .HasColumnType("TINYINT");
            });
        }
    }
}
