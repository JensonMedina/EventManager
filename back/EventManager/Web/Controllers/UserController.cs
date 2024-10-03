using Application.Interfaces;
using Application.Models.Request;
using Application.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{idUser}", Name = "GetUserProfileAsync")]
        public async Task<ActionResult<UserResponse>> GetUserProfileAsync(int idUser)
        {
            var user = await _userService.GetUserProfileAsync(idUser);
            if (user == null)
            {
                return NotFound("No se encontró un usuario con ese id.");
            }
            return user;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> AddUser(UserRequest request)
        {
            if (string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("el nombre, el correo y la contraseña son obligatorios.");
            }

            try
            {
                var response = await _userService.AddUserAsync(request);
                return CreatedAtRoute("GetUserProfileAsync", new { idUser = response.Id }, response);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
