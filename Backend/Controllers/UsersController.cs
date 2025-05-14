using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.JsonModels;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersServices _userServices;

        public UsersController(IUsersServices userServices)
        {
            _userServices = userServices;
        }

        [HttpGet("getUsers")]
        public async Task<IActionResult> GetAdminUsernames()
        {
            try
            {
                var Emails = await _userServices.GetUsers();
                return Ok(Emails);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPost("registerUser")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserRequest req)
        {
            try
            {
                await _userServices.RegisterUser(req);
                return Ok("User created successfully");
            }
            catch (Exception ex)
            {
                var exceptionMessage = ex.Message;

                while (ex.InnerException != null)
                {
                    ex = ex.InnerException;
                    exceptionMessage += " ; " + ex.Message;
                }

                return Problem(exceptionMessage);
            }
        }
    }
}
