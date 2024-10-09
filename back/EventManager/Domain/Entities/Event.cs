using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Event
    {
        public int Id { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string? EventName { get; set; }
        public DateTime? EventDate { get; set; }
        public string? EventLocation { get; set; }
        public string? EventDescription { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public List<Participant> Participants { get; set; } = new List<Participant>();
        public List<TaskEvent> TaskList { get; set; } = new List<TaskEvent>();

    }
}
