using Application.Interfaces;
using Application.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventservice)
        {
            _eventService = eventservice;
        }
        [HttpGet()]
        public async Task<ActionResult> GetAllEventsAsync()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized(); // Si no está el claim, no hay un usuario autorizado.
            }
            var eventsReponse = await _eventService.GetAllEventsAsync(int.Parse(userIdClaim));
            if (eventsReponse == null)
            {
                return BadRequest("No se encontró el usuario.");
            }


            return Ok(eventsReponse);

        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateEventAsync(EventRequest request)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized(); // Si no está el claim, no hay un usuario autorizado.
            }
            if (string.IsNullOrEmpty(request.EventName) || string.IsNullOrEmpty(request.EventDate.ToString()) || string.IsNullOrEmpty(request.EventLocation))
            {
                return BadRequest("El nombre, fecha y ubicación del evento son obligatorios.");
            }
            try
            {
                var response = await _eventService.AddEventAsync(request, int.Parse(userIdClaim));
                return CreatedAtRoute("", new { success = true, data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
    }
}
