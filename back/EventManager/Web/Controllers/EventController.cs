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



            return Ok(eventsReponse);

        }
        [HttpGet("{idEvent}")]
        public async Task<ActionResult> GetEventByIdAsync([FromRoute] int idEvent)
        {
            if (idEvent <= 0)
            {
                return BadRequest("El id del evento es obligatorio");
            }
            var response = await _eventService.GetEventById(idEvent);
            if (response == null)
            {
                return NotFound("No se encontró un evento con ese id.");
            }
            return Ok(new { success = true, data = response });
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateEventAsync(EventRequest request)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized(); // Si no está el claim, no hay un usuario autorizado.
            }

            if (string.IsNullOrEmpty(request.EventName) || !request.EventDate.HasValue || string.IsNullOrEmpty(request.EventLocation))
            {
                return BadRequest("El nombre, fecha y ubicación del evento son obligatorios.");
            }

            try
            {
                var response = await _eventService.AddEventAsync(request, int.Parse(userIdClaim));
                return Created("", new { success = true, data = response });

            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

    }
}
