using MachineMasterApi.Data;
using MachineMasterApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MachineMasterApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductApiController(MachineDbContext dbContext) : ControllerBase
    {
        private readonly MachineDbContext dbContext = dbContext;

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var allProducts = await dbContext.Products.ToListAsync();
            return Ok(allProducts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var Product = await dbContext.Products.FindAsync(id);
            if (Product == null) return NotFound("Product Not Found");
            return Ok(Product);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductModel req)
        {
            dbContext.Products.Add(req);
            await dbContext.SaveChangesAsync();
            return Ok(req);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,ProductModel req)
        {
            var Product = await dbContext.Products.FindAsync(id);
            if (Product == null) return NotFound("Product does not exist");
            dbContext.Entry(Product).CurrentValues.SetValues(req);
            return Ok(Product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var Product = await dbContext.Products.FindAsync(id);
            if (Product == null) return NotFound();
            dbContext.Products.Remove(Product);
            await dbContext.SaveChangesAsync();
            return Ok(new { message = "deleted successfully"});
        }
    }
}
