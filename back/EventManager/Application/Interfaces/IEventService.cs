﻿using Application.Models.Request;
using Application.Models.Response;

namespace Application.Interfaces
{
    public interface IEventService
    {
        Task<List<EventResponse>> GetAllEventsAsync(int idUser);
        Task<EventResponse> AddEventAsync(EventRequest request, int idUser);
        Task<EventDetailResponse?> GetEventById(int idEvent);
    }
}
