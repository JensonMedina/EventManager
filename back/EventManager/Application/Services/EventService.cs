using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using System.Net;

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

        public async Task DeleteEvent(int idEvent, int idUser)
        {
            var entity = await _eventRepositoryBase.GetByIdAsync(idEvent);
            if (entity == null)
            {
                throw new NotFoundException(HttpStatusCode.NotFound, "No se encontró un evento con ese id.");
            }
            if (entity.UserId != idUser)
            {
                throw new NotAllowedException(HttpStatusCode.Forbidden, "El evento no pertenece al usuario.");
            }
            await _eventRepositoryBase.DeleteAsync(entity);
        }

        public async Task<List<EventResponse>> GetAllEventsAsync(int idUser)
        {
            var eventsEntities = await _eventRepository.GetAllEventsAsync(idUser);

            var eventsMapped = eventsEntities.Select(s => _mapping.FromEntityToResponse(s)).ToList();
            return eventsMapped;
        }

        public async Task<EventResponse?> GetEventById(int idEvent, int idUser)
        {
            var eventsEntities = await _eventRepository.GetAllEventsAsync(idUser);
            var response = eventsEntities.FirstOrDefault(e => e.Id == idEvent);
            //var response = await _eventRepository.GetEventByIdAsync(idEvent);
            if (response == null)
            {
                return null; //no existe un evento con ese id
            }
            var responseMapped = _mapping.FromEntityToResponse(response);
            return responseMapped;
        }

        public async Task UpdateEvent(int idEvent, int iUser, EventRequest request)
        {
            var entity = await _eventRepositoryBase.GetByIdAsync(idEvent);
            if (entity == null)
            {
                throw new NotFoundException(HttpStatusCode.NotFound, "No se encontró el evento.");
            }
            if (entity.UserId != iUser)
            {
                throw new NotAllowedException(HttpStatusCode.Forbidden, "El evento no pertenece a este usuario.");
            }

            var entityUpdated = _mapping.FromEntityToEntityMapped(entity, request);
            await _eventRepositoryBase.UpdateAsync(entityUpdated);
        }
    }
}
