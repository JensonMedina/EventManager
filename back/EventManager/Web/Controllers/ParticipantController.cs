using Application.Interfaces;
using Application.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("{idEvent}")]
        public async Task<ActionResult> GetParticipantsAsync([FromRoute] int idEvent)
        {
            if (idEvent <= 0)
            {
                return BadRequest("El id del evento es obligatorio.");
            }
            var response = await _service.GetAllParticipantsFromAnEvent(idEvent);
            return Ok(response);
        }

        [HttpPost("{idEvent}")]
        public async Task<ActionResult> AddParticipant([FromBody] List<ParticipantRequest> participants, [FromRoute] int idEvent)
        {
            if (idEvent <= 0)
            {
                return BadRequest("El id del evento es obligatorio.");
            }

            if (participants == null || !participants.Any())
            {
                return BadRequest("La lista de participantes no puede estar vacía.");
            }

            
            foreach (var participant in participants)
            {
                if (string.IsNullOrWhiteSpace(participant.Name))
                {
                    return BadRequest("El nombre de los participantes es obligatorio.");
                }
            }

            try
            {
                var response = await _service.AddParticipantAsync(participants, idEvent);
                return Created("", new { success = true, data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

    }
}
