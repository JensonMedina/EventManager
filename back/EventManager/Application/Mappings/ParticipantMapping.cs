using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Mappings
{
    public class ParticipantMapping
    {
        public Participant FromRequestToEntity(ParticipantRequest request, int idEvent)
        {
            return new Participant
            {
                Name = request.Name,
                Email = request.Email,
                EventId = idEvent,
            };
        }
        public ParticipantResponse FromEntityToResponse(Participant entity)
        {
            return new ParticipantResponse
            {
                Id = entity.Id,
                Name = entity.Name,
                Email = entity.Email,
            };
        }
        public Participant FromEntityToEntityUpdated(Participant entity, ParticipantRequest request)
        {
            entity.Name = request.Name ?? entity.Name;
            entity.Email = request.Email ?? entity.Email;
            return entity;
        }
    }
}
