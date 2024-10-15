using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using Domain.Interfaces;

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

        public async Task<List<ParticipantResponse>> GetAllParticipantsFromAnEvent(int idEvent)
        {
            var response = await _participantRepository.GetAllParticipantsFromAnEventAsync(idEvent);
            var responseMapped = response.Select(p => _mapping.FromEntityToResponse(p)).ToList();
            return responseMapped;
        }
    }
}
