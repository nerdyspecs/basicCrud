using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using BasicCRUD.Data;
using BasicCRUD.Models;
using System.ComponentModel.DataAnnotations;

namespace BasicCRUD.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private readonly BasicCRUDDbContext _context;

        public CustomersController(BasicCRUDDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            var customers = _context.Customers;
            return Ok(customers.ToList());
        }


        [HttpGet("{customer_id}")]
        public IActionResult GetCustomer(int customer_id)
        {
            var customer = _context.Customers
                .FirstOrDefault(m => m.CustomerId == customer_id);

            if (customer != null)
            {
                return Ok(customer);
            }
            else {
                return NotFound($"Customer Not Found with Id {customer_id} ");
            }
        }

        [HttpDelete("{customer_id}")]
        public IActionResult Delete(int customer_id)
        {
            var customer = _context.Customers
                .FirstOrDefault(m => m.CustomerId == customer_id);

            if (customer != null)
            {
                _context.Customers.Remove(customer);
                if (_context.SaveChanges() > 0)
                {
                    return Ok($"Deleted Customer with Id {customer_id}");
                }
                else {
                    return BadRequest("Delete Customer failed");
                }
            }
            else
            {
                return NotFound($"Customer Not Found with Id {customer_id} ");
            }
        }

        [HttpPatch("{customer_id}")]
        public IActionResult UpdateCustomer(int customer_id, string Name, string Email, string Contact, string Occupation, int BoughtUnits)
        {
            var customer = _context.Customers
                    .FirstOrDefault(customer => customer.CustomerId == customer_id);

            if (customer != null)
            {
                customer.Name = Name;
                customer.Email = Email;
                customer.Contact = Contact;
                customer.Occupation = Occupation;
                customer.BoughtUnits = BoughtUnits;
                _context.Customers.Update(customer);
                if (_context.SaveChanges() > 0)
                {
                    return Ok(customer);
                }
                else
                {
                    return BadRequest("Customer Not Updated");
                }
            }
            else {
                return BadRequest("Failed to update");
            }
        }

        [HttpPost]
        public IActionResult CreateCustomer(string Name, string Email, string Contact, string Occupation, int BoughtUnits)
        {
            var customer = new Customer
            {
                Name = Name ?? "", 
                Email = Email ?? "", 
                Contact = Contact ?? "", 
                Occupation = Occupation ?? "", 
                BoughtUnits = BoughtUnits 
            };

            _context.Customers.Add(customer);
            if (_context.SaveChanges() > 0)
            {
                return Ok(customer);
            }
            else { 
                return BadRequest("Customer Not Created");
            }
        }
    }
}
