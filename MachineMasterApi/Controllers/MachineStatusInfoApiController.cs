using MachineMasterApi.Data;
using MachineMasterApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Machine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineStatusInfoApiController(MachineDbContext dbContext) : ControllerBase
    {
        private readonly MachineDbContext dbContext = dbContext;

        [HttpGet]
        public async Task<IActionResult> GetAllMachineStatusInfos()
        {
            var AllMachineStatusInfo = await dbContext.MachineStatusInfo.ToListAsync();
            return Ok(AllMachineStatusInfo);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var info = await dbContext.MachineStatusInfo.FindAsync(id);
            return info == null ? NotFound("Status Info Not Found") : Ok(info);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Machine_Status_Info_Model req)
        {
            dbContext.MachineStatusInfo.Add(req);
            await dbContext.SaveChangesAsync();
            return Ok(req);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Machine_Status_Info_Model req)
        {
            var info = await dbContext.MachineStatusInfo.FindAsync(id);
            if (info == null) return NotFound();

            dbContext.Entry(info).CurrentValues.SetValues(req);
            await dbContext.SaveChangesAsync();

            return Ok(info);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var info = await dbContext.MachineStatusInfo.FindAsync(id);
            if (info == null) return NotFound();

            dbContext.MachineStatusInfo.Remove(info);
            await dbContext.SaveChangesAsync();
            return Ok(new { message = "deleted" });
        }
    }
}
