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
    public class ParticipantService : IParticipantService
    {
        private readonly IRepositoryBase<Participant> _repositoryBase;
        private readonly IParticipantRepository _participantRepository;
        private readonly ParticipantMapping _mapping;

        public ParticipantService(IRepositoryBase<Participant> repositoryBase, IParticipantRepository participantRepository, ParticipantMapping mapping)
        {
            _repositoryBase = repositoryBase;
            _participantRepository = participantRepository;
            _mapping = mapping;
        }

        public async Task<List<ParticipantResponse>> AddParticipantAsync(List<ParticipantRequest> participants, int idEvent)
        {
            var listReponse = new List<ParticipantResponse>();
            foreach (var participant in participants)
            {
                var entity = _mapping.FromRequestToEntity(participant, idEvent);
                var response = await _repositoryBase.AddAsync(entity);
                var responseMapped = _mapping.FromEntityToResponse(response);
                listReponse.Add(responseMapped);
            }

            return listReponse;
        }

        public async Task DeleteParticipant(int idUser, int idEvent, int idParticipant)
        {
            var participant = await _participantRepository.GetParticipantFromAnEvent(idParticipant, idEvent, idUser);
            //despues valido si ese participante esta anotado en ese evento.
            if (participant == null)
            {
                throw new NotFoundException(HttpStatusCode.NotFound, "Participante no encontrado");
            }
            await _repositoryBase.DeleteAsync(participant);
        }

        //public async Task<List<ParticipantResponse>> GetAllParticipantsFromAnEvent(int idEvent)
        //{
        //    var response = await _participantRepository.GetAllParticipantsFromAnEventAsync(idEvent);
        //    var responseMapped = response.Select(p => _mapping.FromEntityToResponse(p)).ToList();
        //    return responseMapped;
        //}

        public async Task UpdateParticipant(int idUser, int idEvent, int idParticipant, ParticipantRequest request)
        {
            //primero me traigo el participante
            var participant = await _participantRepository.GetParticipantFromAnEvent(idParticipant, idEvent, idUser);
            //despues valido si ese participante esta anotado en ese evento.
            if (participant == null)
            {
                throw new NotFoundException(HttpStatusCode.NotFound, "Participante no encontrado");
            }
            var participantUpdated = _mapping.FromEntityToEntityUpdated(participant, request);
            await _repositoryBase.UpdateAsync(participantUpdated);
        }
    }
}
