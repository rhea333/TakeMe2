using Microsoft.AspNetCore.Mvc;
using Backend.Services;

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
    }
}
