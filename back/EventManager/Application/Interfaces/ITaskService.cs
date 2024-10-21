
using Application.Models.Request;
using Application.Models.Response;

namespace Application.Interfaces
{
    public interface ITaskService
    {
        Task<List<TaskResponse>?> AddTask(int userId, int eventId, List<TaskRequest> listTask);
        Task UpdateTask(int userId, int taskId, int eventId, TaskRequest request);
    }
}
