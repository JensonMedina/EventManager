using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class EventService : IEventService
    {
        private readonly IRepositoryBase<Event> _eventRepositoryBase;
        private readonly IEventRepository _eventRepository;
        private readonly EventMapping _mapping;

        public EventService(IRepositoryBase<Event> eventRepositoryBase, IEventRepository eventRepository, EventMapping mapping)
        {
            _eventRepositoryBase = eventRepositoryBase;
            _eventRepository = eventRepository;
            _mapping = mapping;
        }

        public async Task<EventResponse> AddEventAsync(EventRequest request, int idUser)
        {
            var entityMapped = _mapping.FromRequestToEntity(request, idUser);
            var response = await _eventRepositoryBase.AddAsync(entityMapped);
            var responseMapped = _mapping.FromEntityToResponse(response);
            return responseMapped;

        }

        public async Task<List<EventResponse>> GetAllEventsAsync(int idUser)
        {
            var eventsEntities = await _eventRepository.GetAllEventsAsync(idUser);

            var eventsMapped = eventsEntities.Select(s => _mapping.FromEntityToResponse(s)).ToList();
            return eventsMapped;
        }
    }
}
