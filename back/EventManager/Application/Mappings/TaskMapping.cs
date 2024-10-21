using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Mappings
{
    public class TaskMapping
    {
        public TaskResponse FromEntityToResponse(TaskEvent entity)
        {
            var participantMapping = new ParticipantMapping();
            return new TaskResponse
            {
                Id = entity.Id,
                NameTask = entity.NameTask,
                State = entity.State,
                AssignedParticipant = participantMapping.FromEntityToResponse(entity.AssignedParticipant),
            };
        }
        public TaskEvent FromRequestToEntity(TaskRequest request, int eventId)
        {
            return new TaskEvent
            {
                NameTask = request.NameTask,
                State = false,
                AssignedParticipantId = request.AssignedParticipantId,
                EventId = eventId,
            };
        }
        public TaskEvent FromEntityToEntityUpdated(TaskEvent entity, TaskRequest request)
        {
            entity.NameTask = request.NameTask ?? entity.NameTask;
            entity.State = request.State;
            entity.AssignedParticipantId = request.AssignedParticipantId;
            return entity;
        }
    }
}
