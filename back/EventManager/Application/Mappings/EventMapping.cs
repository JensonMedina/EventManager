using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            };
        }
    }
}
