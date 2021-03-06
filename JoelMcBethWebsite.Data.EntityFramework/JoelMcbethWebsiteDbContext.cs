﻿namespace JoelMcBethWebsite.Data.EntityFramework
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;
    using JoelMcBethWebsite.Tasks;
    using Microsoft.EntityFrameworkCore;

    public class JoelMcbethWebsiteDbContext : DbContext
    {
        public JoelMcbethWebsiteDbContext(DbContextOptions<JoelMcbethWebsiteDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<TaskCount> TaskCounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("User");
        }
    }
}
