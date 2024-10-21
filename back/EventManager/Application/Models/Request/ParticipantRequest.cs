using System.ComponentModel.DataAnnotations;

namespace Application.Models.Request
{
    public class ParticipantRequest
    {
        [Required]
        public string? Name { get; set; }
        public string? Email { get; set; }
    }
}
