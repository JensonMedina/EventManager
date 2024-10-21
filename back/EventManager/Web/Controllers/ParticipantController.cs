using Application.Interfaces;
using Application.Models.Request;
using Domain.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Controllers
{
    [Route("api/events/[controller]")]
    [ApiController]
    [Authorize]
    public class ParticipantController : ControllerBase
    {
        private readonly IParticipantService _service;
        public ParticipantController(IParticipantService service)
        {
            _service = service;
        }

        //[HttpGet("{idEvent}")]
        //public async Task<ActionResult> GetParticipantsAsync([FromRoute] int idEvent)
        //{

        //    var response = await _service.GetAllParticipantsFromAnEvent(idEvent);
        //    return Ok(response);
        //}

        [HttpPost("{idEvent}")]
        public async Task<ActionResult> AddParticipant([FromBody] List<ParticipantRequest> participants, [FromRoute] int idEvent)
        {


            if (participants == null || !participants.Any())
            {
                return BadRequest(new { Succes = false, Message = "La lista de participantes no puede estar vacía." });
            }

            var response = await _service.AddParticipantAsync(participants, idEvent);
            return Created("", new { success = true, data = response });

        }
        [HttpPut("{idParticipant}")]
        public async Task<ActionResult> UpdateParticipant([FromRoute] int idParticipant, [FromQuery] int idEvent, [FromBody] ParticipantRequest request)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized(new { Succes = false, Msg = "No hay un usuario autorizado." }); // Si no está el claim, no hay un usuario autorizado.
            }
            try
            {
                await _service.UpdateParticipant(int.Parse(userIdClaim), idEvent, idParticipant, request);
                return NoContent();
            }
            catch (NotFoundException ex)
            {

                return StatusCode((int)ex.Code, new { Success = false, Msg = ex.Msg });
            }
        }
        [HttpDelete("{idParticipant}")]
        public async Task<ActionResult> DeleteParticipant([FromRoute] int idParticipant, [FromQuery] int idEvent)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized(new { Succes = false, Msg = "No hay un usuario autorizado." }); // Si no está el claim, no hay un usuario autorizado.
            }
            try
            {
                await _service.DeleteParticipant(int.Parse(userIdClaim), idEvent, idParticipant);
                return NoContent();
            }
            catch (NotFoundException ex)
            {

                return StatusCode((int)ex.Code, new { Success = false, Msg = ex.Msg });
            }
        }
    }
}
