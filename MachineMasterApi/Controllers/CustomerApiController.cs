using MachineApi.Models;
using MachineMasterApi.Data;
using MachineMasterApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Machine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerApiController(MachineDbContext dbContext) : ControllerBase
    {
        private readonly MachineDbContext dbContext = dbContext;

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var allCustomers = await dbContext.Customers.ToListAsync();
            return Ok(allCustomers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var customer = await dbContext.Customers.FindAsync(id);
            return customer == null ? NotFound("Customer Not Found") : Ok(customer);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CustomerModel req)
        {
            //req.CreatedDate = DateTime.Now;
            //req.IsActive = true;

            dbContext.Customers.Add(req);
            await dbContext.SaveChangesAsync();

            return Ok(req);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CustomerModel req)
        {
            var customer = await dbContext.Customers.FindAsync(id);
            if (customer == null) return NotFound();

            dbContext.Entry(customer).CurrentValues.SetValues(req);

            await dbContext.SaveChangesAsync();
            return Ok(customer);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var customer = await dbContext.Customers.FindAsync(id);
            if (customer == null) return NotFound();

            dbContext.Customers.Remove(customer);
            await dbContext.SaveChangesAsync();
            return Ok(new { message = "deleted" });
        }
    }
}
