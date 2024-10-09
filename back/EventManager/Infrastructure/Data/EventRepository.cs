using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class EventRepository : EfRepository<Event>, IEventRepository
    {
        public EventRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<List<Event>> GetAllEventsAsync(int userId)
        {
            var events = await _context.Events
                                       .Where(e => e.UserId == userId)
                                       .ToListAsync();
            return events;
        }
        public async Task<Event?> GetEventByIdAsync(int idEvent)
        {
            var response = await _context.Events.Include(e => e.Participants).Include(e => e.TaskList).FirstOrDefaultAsync(e => e.Id == idEvent);
            return response;
        }

    }
}
