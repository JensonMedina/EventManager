using System.ComponentModel.DataAnnotations.Schema;

namespace Application.Models.Response
{
    public class TaskReponse
    {
        public int Id { get; set; }
        public string? NameTask { get; set; }
        public bool State { get; set; }

    }
}