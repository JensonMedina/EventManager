using Application.Interfaces;
using Application.Models.Request;
using Domain.Exceptions;
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
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized(); // Si no está el claim, no hay un usuario autorizado.
            }
            if (idEvent <= 0)
            {
                return BadRequest("El id del evento es obligatorio");
            }
            var response = await _eventService.GetEventById(idEvent, int.Parse(userIdClaim));
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
                return BadRequest(new
                {
                    Succes = false,
                    Message = "El nombre, fecha y ubicación del evento son obligatorios."
                });
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

        [HttpPut("{idEvent}")]
        public async Task<ActionResult> UpdateEvent([FromRoute] int idEvent, [FromBody] EventRequest request)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized(); // Si no está el claim, no hay un usuario autorizado.
            }
            try
            {
                await _eventService.UpdateEvent(idEvent, int.Parse(userIdClaim), request);
                return NoContent();
            }
            catch (NotFoundException ex)
            {
                return StatusCode((int)ex.Code, new { Success = false, Msg = ex.Msg });
            }
            catch (NotAllowedException ex)
            {
                return StatusCode((int)ex.Code, new { Success = false, Msg = ex.Msg });
            }
        }

        [HttpDelete("{idEvent}")]
        public async Task<ActionResult> DeleteEvent([FromRoute] int idEvent)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized(); // Si no está el claim, no hay un usuario autorizado.
            }
            try
            {
                await _eventService.DeleteEvent(idEvent, int.Parse(userIdClaim));
                return NoContent();
            }
            catch (NotFoundException ex)
            {

                return StatusCode((int)ex.Code, new { Success = false, Msg = ex.Msg });
            }
            catch (NotAllowedException ex)
            {
                return StatusCode((int)ex.Code, new { Success = false, Msg = ex.Msg });
            }
        }

    }
}
