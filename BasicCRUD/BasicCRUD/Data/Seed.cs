using System.Reflection.Emit;
using BasicCRUD.Models;

namespace BasicCRUD.Data
{
    public class Seed
    {
        public static void Initialize(BasicCRUDDbContext context)
        {
            // Seed 5 customers
            if (!context.Customers.Any())
            {
                var customers = new List<Customer>
                {
                    new Customer
                    {
                        Name = "Johnathan Smith",
                        Email = "johnsmith@example.com",
                        Contact = "012-345-6789",
                        Occupation = "Software Engineer",
                        BoughtUnits = 15,
                        CreatedAt = DateTime.Now.AddDays(-25),
                        UpdatedAt = DateTime.Now.AddDays(-5)
                    },
                    new Customer
                    {
                        Name = "Emily Johnson",
                        Email = "emilyj@example.com",
                        Contact = "987-654-3210",
                        Occupation = "Marketing Manager",
                        BoughtUnits = 8,
                        CreatedAt = DateTime.Now.AddDays(-20),
                        UpdatedAt = DateTime.Now.AddDays(-2)
                    },
                    new Customer
                    {
                        Name = "Michael Brown",
                        Email = "michaelbrown@example.com",
                        Contact = "555-123-4567",
                        Occupation = "Project Manager",
                        BoughtUnits = 12,
                        CreatedAt = DateTime.Now.AddDays(-30),
                        UpdatedAt = DateTime.Now.AddDays(-10)
                    },
                    new Customer
                    {
                        Name = "Sophia Wilson",
                        Email = "sophiawilson@example.com",
                        Contact = "444-567-8901",
                        Occupation = "Graphic Designer",
                        BoughtUnits = 5,
                        CreatedAt = DateTime.Now.AddDays(-15),
                        UpdatedAt = DateTime.Now.AddDays(-3)
                    },
                    new Customer
                    {
                        Name = "Daniel Martinez",
                        Email = "danielmartinez@example.com",
                        Contact = "222-333-4444",
                        Occupation = "Business Analyst",
                        BoughtUnits = 20,
                        CreatedAt = DateTime.Now.AddDays(-10),
                        UpdatedAt = DateTime.Now.AddDays(-1)
                    }
                };
                context.Customers.AddRange(customers);
                context.SaveChanges();
            }
        }
    }
}
