using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IParticipantRepository
    {
        //Task<List<Participant>> GetAllParticipantsFromAnEventAsync(int idEvent);
        Task<Participant?> GetParticipantFromAnEvent(int idParticipant, int idEvent, int idUser);
    }
}
