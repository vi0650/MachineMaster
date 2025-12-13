using MachineApi.Models;
using MachineMasterApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MachineApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserApiController(MachineDbContext dbContext) : ControllerBase
    {
        //private static List<tblUserModel> UsersData = new List<tblUserModel>
        //{
        //    new tblUserModel { UserId = 1 , UserName = "admin", Password = "123", Email = "admin@gmail.com", Role = "admin", isActive = false, CreatedDate = DateTime.Now, UpdatedDate = DateTime.Now }
        //};

        private readonly MachineDbContext dbContext = dbContext;

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var allUsers = await dbContext.Users.ToListAsync();
            return Ok(allUsers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await dbContext.Users.FindAsync(id);
            return user == null ? NotFound("User Not Found") : Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserModel req)
        {
            //req.CreatedDate = DateTime.Now;
            //req.IsActive = true;

            await dbContext.Users.AddAsync(req);
            await dbContext.SaveChangesAsync();

            return Ok(req);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UserModel req)
        {
            var user = await dbContext.Users.FindAsync(id);
            if (user == null) return NotFound();

            dbContext.Entry(user).CurrentValues.SetValues(req);

            await dbContext.SaveChangesAsync();
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await dbContext.Users.FindAsync(id);
            if (user == null) return NotFound();

            dbContext.Users.Remove(user);
            await dbContext.SaveChangesAsync();
            return Ok(new { message = "deleted" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDataModel req)
        {
            var user = await dbContext.Users
                .FirstOrDefaultAsync(x => x.UserName == req.UserName && x.Password == req.Password);

            if (user == null)
                return Unauthorized("Invalid username or password");

            return Ok(new
            {
                userId = user.UserId,
                userName = user.UserName,
                user.IsActive,
                user.Description,
                role = user.Role
            });
        }
    }
}