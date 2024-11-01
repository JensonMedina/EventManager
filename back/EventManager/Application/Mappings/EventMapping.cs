﻿using Application.Models.Request;
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
            var participantMapping = new ParticipantMapping();
            var taskMapping = new TaskMapping();
            return new EventResponse
            {
                Id = entity.Id,
                EventName = entity.EventName,
                EventDate = entity.EventDate,
                EventLocation = entity.EventLocation,
                EventDescription = entity.EventDescription,
                Participants = entity.Participants.Select(p => participantMapping.FromEntityToResponse(p)).ToList(),
                Tasks = entity.TaskList.Select(t => taskMapping.FromEntityToResponse(t)).ToList()
            };
        }
        public Event FromEntityToEntityMapped(Event entity, EventRequest request)
        {

            entity.EventName = request.EventName ?? entity.EventName;
            entity.EventDate = request.EventDate ?? entity.EventDate;
            entity.EventLocation = request.EventLocation ?? entity.EventLocation;
            entity.EventDescription = request.EventDescription ?? entity.EventDescription;
            return entity;
        }

    }
}

