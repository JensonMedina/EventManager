using Application.Interfaces;
using Application.Models.Request;
using Domain.Entities;
using Domain.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("{eventId}")]
        public async Task<ActionResult> AddTaskAsync([FromRoute] int eventId, [FromBody] List<TaskRequest> request)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized(new { Succes = false, Message = "No hay un usuario autorizado." }); // Si no está el claim, no hay un usuario autorizado.
            }
            if (eventId <= 0)
            {
                return BadRequest(new
                {
                    Succes = false,
                    Message = "El id del evento es obligatorio."
                });
            }

            if (request == null || !request.Any())
            {
                return BadRequest(new
                {
                    Succes = false,
                    Message = "La lista de tareas no puede estar vacía."
                });
            }


            foreach (var task in request)
            {
                if (string.IsNullOrWhiteSpace(task.NameTask))
                {
                    return BadRequest(new { Succes = false, Message = "El nombre de los participantes es obligatorio." });
                }
                if (task.AssignedParticipantId <= 0)
                {
                    return BadRequest(new { Succes = false, Message = "El id de los participantes es obligatorio." });
                }
            }
            try
            {
                var response = await _taskService.AddTask(int.Parse(userIdClaim), eventId, request);

                return Created("", new { Succes = true, Data = response });
            }
            catch (NotFoundException ex)
            {
                return StatusCode((int)ex.Code, new { Success = false, Message = ex.Msg });
            }
        }



        [HttpPut("{taskId}")]
        public async Task<ActionResult> UpdateTask([FromRoute] int taskId, [FromQuery] int eventId, [FromBody] TaskRequest request)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized(new { Succes = false, Message = "No hay un usuario autorizado." }); // Si no está el claim, no hay un usuario autorizado.
            }
            if (request.AssignedParticipantId <= 0)
            {
                return BadRequest(new { Succes = false, Message = "El id del participante asignado es obligatorio." });
            }
            try
            {
                await _taskService.UpdateTask(int.Parse(userIdClaim), taskId, eventId, request);
                return NoContent();
            }
            catch (NotFoundException ex)
            {

                return StatusCode((int)ex.Code, new { Success = false, Message = ex.Msg });
            }
            catch (NotAllowedException ex)
            {

                return StatusCode((int)ex.Code, new { Success = false, Message = ex.Msg });
            }
        }
    }

}
