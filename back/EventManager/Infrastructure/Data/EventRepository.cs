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
                                        .Include(e => e.Participants).
                                        Include(e => e.TaskList)
                                       .Where(e => e.UserId == userId)
                                       .ToListAsync();
            return events;
        }


    }
}
