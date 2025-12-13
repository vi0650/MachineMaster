using MachineApi.Models;
using MachineMasterApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MachineMasterApi.Data
{
    public class MachineDbContext(DbContextOptions<MachineDbContext> options) : DbContext(options)
    {
        public DbSet<UserModel> Users { get; set; } // dbset users makes tables to database and take reference from model
        public DbSet<CategoryModel> Categories { get; set; } // dbset category
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<MachineModel> Machines { get; set; }
        public DbSet<Machine_Status_Info_Model> MachineStatusInfo { get; set; }
        public DbSet<CustomerModel> Customers { get; set; }
    }
}
