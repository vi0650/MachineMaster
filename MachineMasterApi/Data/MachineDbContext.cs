using MachineApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MachineApi.Data
{
    public class MachineDbContext : DbContext
    {
        public MachineDbContext(DbContextOptions<MachineDbContext> options) : base(options)
        {

        }
        public DbSet<UserModel> Users { get; set; } // dbset makes tables to database and take reference from model


        //public DbSet<UserLoginData> LoginData { get; set; }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<UserLoginData>().HasNoKey().ToTable("LoginData");
        //}
    }
}
