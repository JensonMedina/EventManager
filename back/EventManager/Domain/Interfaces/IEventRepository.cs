using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IEventRepository
    {
        Task<List<Event>> GetAllEventsAsync(int userId);

    }
}
