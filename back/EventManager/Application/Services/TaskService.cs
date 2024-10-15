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
    public class TaskService : ITaskService
    {
        private readonly IRepositoryBase<TaskEvent> _repositoryBase;
        private readonly IEventRepository _eventRepository;
        private readonly TaskMapping _mapping;



        public TaskService(IRepositoryBase<TaskEvent> repositoryBase, IEventRepository eventRepository, TaskMapping mapping)
        {
            _repositoryBase = repositoryBase;
            _eventRepository = eventRepository;
            _mapping = mapping;
        }

        public async Task<List<TaskResponse>?> AddTask(int userId, int eventId, List<TaskRequest> listTask)
        {
            //primero voy a validar que este usuario tenga ese evento
            var eventsFromUser = await _eventRepository.GetAllEventsAsync(userId); //aca obtengo todos los eventos del usuario
            var exist = eventsFromUser.FirstOrDefault(e => e.Id == eventId); //aca verifico si el evento existe para este usuario
            if (exist == null)
            {
                //el evento no se encontró
                throw new NotFoundException(HttpStatusCode.NotFound, "No se encontró el evento para este usuario.");
            }
            //si el evento si se encontró entonces tengo que verificar si existe el participante al que le quiero asignar la tarea en ese evento
            var listResponse = new List<TaskResponse>();
            foreach (var task in listTask)
            {
                var participantExist = exist.Participants.FirstOrDefault(p => p.Id == task.AssignedParticipantId); //aca accedo a la lista de participantes del evento y verifico si existe un participante que coincida con el id del participante que estoy pasando en la request.
                if (participantExist == null)
                {
                    //no se encontró el participante
                    throw new NotFoundException(HttpStatusCode.NotFound, "No se encontró el participante al que se le quiere asignar la tarea."); //no puedo asignar la tarea a un participante que no existe, asi que devuelvo null.
                }
                //si el partipante si existe entonces agrego la tarea
                var entity = _mapping.FromRequestToEntity(task, eventId);
                var response = await _repositoryBase.AddAsync(entity);
                var responseMapped = _mapping.FromEntityToResponse(response);
                listResponse.Add(responseMapped);

            }


            return listResponse;
        }


    }
}
