using MachineApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MachineApi.Data
{
    public class MachineDbContext : DbContext
    {
        public MachineDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<UserModel> Users { get; set; }


        //public DbSet<UserLoginData> LoginData { get; set; }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<UserLoginData>().HasNoKey().ToTable("LoginData");
        //}
    }
}
