using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.JsonModels;
using Backend.Utility;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController(IUsersServices _userServices) : ControllerBase
    {

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
                return Problem(Utilities.GetExceptionMessage(ex));
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
                return Problem(Utilities.GetExceptionMessage(ex));
            }
        }

        [HttpPost("uploadRegistrationImages")]
        public async Task<IActionResult> UploadImagesForRegistration([FromForm] RegistrationUploadImagesReq req)
        {
            try
            {
                await _userServices.uploadRegistrationImages(req);
                return Ok("Images uploaded successfully");
            }
            catch (Exception ex)
            {
                return Problem(Utilities.GetExceptionMessage(ex));
            }
        }
    }
}
