using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ParticipantRepository : EfRepository<Participant>, IParticipantRepository
    {
        public ParticipantRepository(ApplicationDbContext context) : base(context)
        {
        }

        //public async Task<List<Participant>> GetAllParticipantsFromAnEventAsync(int idEvent)
        //{
        //    var participants = await _context.Participants.Where(p => p.EventId == idEvent).ToListAsync();
        //    return participants;
        //}
        public async Task<Participant?> GetParticipantFromAnEvent(int idParticipant, int idEvent, int idUser)
        {
            //obtengo el participante incluyendo el evento al que el participante pertenece, valido que el evento al que esta inscripto ese participante sea el que me estan pasando y ademas valido que ese evento pertenezca al usuario que lo esta solicitando.
            var participant = await _context.Participants.Include(p => p.Event).FirstOrDefaultAsync(p => p.Id.Equals(idParticipant) && p.EventId.Equals(idEvent) && p.Event.UserId.Equals(idUser));
            return participant;
        }
    }
}
