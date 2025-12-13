using MachineMasterApi.Data;
using MachineMasterApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MachineMasterApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryApiController(MachineDbContext dbContext) : ControllerBase
    {
        private readonly MachineDbContext dbContext = dbContext;

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var allCategories = await dbContext.Categories.ToListAsync();
            return Ok(allCategories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await dbContext.Categories.FindAsync(id);
            if (category == null) return NotFound("No Category Found");
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CategoryModel req)
        {
            dbContext.Categories.Add(req);
            await dbContext.SaveChangesAsync();
            return Ok(req);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,CategoryModel req)
        {
            var category = await dbContext.Categories.FindAsync(id);
            if (category == null) return NotFound("Category does not exist");

            dbContext.Entry(category).CurrentValues.SetValues(req);
            await dbContext.SaveChangesAsync();
            return Ok(category);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await dbContext.Categories.FindAsync(id);
            if (category == null) return NotFound();

            dbContext.Categories.Remove(category);
            await dbContext.SaveChangesAsync();
            return Ok(new { message = "deleted" });
        }
    }
}