using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PushServerTest.Persistence
{
    public class PushServerDbContext : DbContext
    {
        public DbSet<ApiClientData> ApiClientDatas { get; set; }
        public DbSet<UserData> UserDatas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite("Data Source=PushServerDbContext.db");
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserData>()
                .HasOne<ApiClientData>()
                .WithMany()
                .HasForeignKey(v => v.ApiNodeId);

            modelBuilder.Entity<UserData>()
                .HasKey(v => new {v.Id, v.ApiNodeId});
        }
    }
}
