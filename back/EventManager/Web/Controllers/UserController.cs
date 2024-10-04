﻿using Application.Interfaces;
using Application.Models.Request;
using Application.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ICustomAuthenticationService _customAuthenticationService;

        public UserController(IUserService userService, ICustomAuthenticationService customAuthenticationService)
        {
            _userService = userService;
            _customAuthenticationService = customAuthenticationService;
        }


        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult<UserResponse>> GetUserProfileAsync()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            var user = await _userService.GetUserProfileAsync(int.Parse(userIdClaim));
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
                return CreatedAtRoute("", response);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> loginAsync(AuthRequest request)
        {
            try
            {
                var token = await _customAuthenticationService.Authenticate(request);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
