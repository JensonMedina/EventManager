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

        public async Task<List<Participant>> GetAllParticipantsFromAnEventAsync(int idEvent)
        {
            var participants = await _context.Participants.Where(p => p.EventId == idEvent).ToListAsync();
            return participants;
        }
    }
}
