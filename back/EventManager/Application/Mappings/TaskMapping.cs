using Application.Models.Response;
using Domain.Entities;

namespace Application.Mappings
{
    public class TaskMapping
    {
        public TaskReponse FromEntityToResponse(TaskEvent entity)
        {
           
            return new TaskReponse
            {
                Id = entity.Id,
                NameTask = entity.NameTask,
                State = entity.State,
            };
        }
    }
}
