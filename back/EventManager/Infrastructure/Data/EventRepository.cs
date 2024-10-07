using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class EventRepository : EfRepository<Event>, IEventRepository
    {
        public EventRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<List<Event>?> GetAllEventsAsync(int userId)
        {
            var userWithEvents = await _context.Users.Include(u => u.EventList).FirstOrDefaultAsync(u => u.Id == userId);
            if (userWithEvents == null)
            {
                return null; //no se encontro el usuario con ese id
            }
            var events = userWithEvents.EventList.ToList();

            return events;
        }
    }
}
