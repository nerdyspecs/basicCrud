using Microsoft.EntityFrameworkCore;
using BasicCRUD.Models;
namespace BasicCRUD.Data
{
    public class BasicCRUDDbContext : DbContext
    {
        public BasicCRUDDbContext(DbContextOptions<BasicCRUDDbContext> options)
            : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
