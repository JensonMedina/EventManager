using Application.Models.Request;
using Application.Models.Response;

namespace Application.Interfaces
{
    public interface IParticipantService
    {
        Task<List<ParticipantResponse>> AddParticipantAsync(List<ParticipantRequest> participants, int idEvent);
        //Task<List<ParticipantResponse>> GetAllParticipantsFromAnEvent(int idEvent);
        Task UpdateParticipant(int idUser, int idEvent, int idParticipant, ParticipantRequest request);
    }
}
