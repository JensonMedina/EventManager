using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Mappings
{
    public class EventMapping
    {
        public Event FromRequestToEntity(EventRequest request, int idUser)
        {
            return new Event
            {
                EventName = request.EventName,
                EventDate = request.EventDate,
                EventLocation = request.EventLocation,
                EventDescription = request.EventDescription,
                UserId = idUser
            };
        }
        public EventResponse FromEntityToResponse(Event entity)
        {
            return new EventResponse
            {
                Id = entity.Id,
                EventName = entity.EventName,
                EventDate = entity.EventDate,
                EventLocation = entity.EventLocation,
                EventDescription = entity.EventDescription,
            };
        }
        public EventDetailResponse FromEntityToResponseWithDetails(Event entity)
        {
            var participantMapping = new ParticipantMapping();
            var taskMapping = new TaskMapping();
            return new EventDetailResponse
            {
                Id = entity.Id,
                EventName = entity.EventName,
                EventDate = entity.EventDate,
                EventLocation = entity.EventLocation,
                EventDescription = entity.EventDescription,
                Participants = entity.Participants.Select(p => participantMapping.FromEntityToResonse(p)).ToList(),
                Tasks = entity.TaskList.Select(t => taskMapping.FromEntityToResponse(t)).ToList()
            };
        }
    }
}

