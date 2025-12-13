using MachineMasterApi.Data;
using MachineMasterApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;

namespace Machine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineApiController(MachineDbContext dbContext) : ControllerBase
    {
        private readonly MachineDbContext dbContext = dbContext;

        [HttpGet]
        public async Task<IActionResult> GetAllMachines()
        {
            var AllMachines = await dbContext.Machines.ToListAsync();
            return Ok(AllMachines);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var machine = await dbContext.Machines.FindAsync(id);
            return machine == null ? NotFound("Machine Not Found") : Ok(machine);
        }

        [HttpPost]
        public async Task<IActionResult> Create(MachineModel req)
        {
            var productExist = await dbContext.Products.AnyAsync(p => p.ProductId == req.ProductId);
            if (!productExist)
            {
                return BadRequest(new { message = "The Product Id is not exist" });
            }
            try
            {
                dbContext.Machines.Add(req);
                await dbContext.SaveChangesAsync();
                return Ok(req);
            }
            catch
            {
                return BadRequest(new { Message = "Database Error" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MachineModel req)
        {
            var machine = await dbContext.Machines.FindAsync(id);
            if (machine == null) return NotFound();

            dbContext.Entry(machine).CurrentValues.SetValues(req);
            await dbContext.SaveChangesAsync();

            return Ok(machine);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var machine = await dbContext.Machines.FindAsync(id);
            if (machine == null) return NotFound();

            dbContext.Machines.Remove(machine);
            await dbContext.SaveChangesAsync();
            return Ok(new { message = "deleted" });
        }
    }
}
