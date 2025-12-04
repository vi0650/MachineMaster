//using MachineApi.Data;
//using MachineApi.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

//namespace MachineMasterApi.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LoginApi : ControllerBase
//    {
//        private readonly MachineDbContext dbContext;

//        public LoginApi(MachineDbContext dbContext)
//        {
//            this.dbContext = dbContext;
//        }

//        [HttpGet]
//        public async Task<IActionResult> GetAllUsers()
//        {
//            var allUsers = await dbContext.LoginData.ToListAsync();
//            return Ok(allUsers);
//        }

//        [HttpPost("login")]
//        public async Task<IActionResult> Login(UserLoginData req)
//        {
//            var user = await dbContext.LoginData.FirstOrDefaultAsync
//                (x => x.UserName == req.UserName && x.Password == req.Password);

//            if (user == null)
//                return Unauthorized("Invalid username or password");

//            return Ok(user);
//        }
//    }
//}
