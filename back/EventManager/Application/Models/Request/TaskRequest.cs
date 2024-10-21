using System.ComponentModel.DataAnnotations;

namespace Application.Models.Request
{
    public class TaskRequest
    {
        [Required]
        public string? NameTask { get; set; }
        public bool State { get; set; }
        [Required]
        public int AssignedParticipantId { get; set; }
    }
}
