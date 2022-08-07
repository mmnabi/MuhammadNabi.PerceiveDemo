using Microsoft.AspNetCore.Mvc;
using MuhammadNabi.PerceiveDemo.Web.Models.DbModels;
using MuhammadNabi.PerceiveDemo.Web.Models.ViewModels;
using MuhammadNabi.PerceiveDemo.Web.Services.Abstractions;

namespace MuhammadNabi.PerceiveDemo.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseController<AccountController>
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto newUser)
        {
            if (newUser == null || !ModelState.IsValid)
                return BadRequest();

            var result = await _userService.RegisterUser(newUser);
            if (!result.IsSuccessfulRegistration)
                return BadRequest(result);

            return StatusCode(201);
        }
    }
}