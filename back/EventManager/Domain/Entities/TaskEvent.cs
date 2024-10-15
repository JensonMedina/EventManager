using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class TaskEvent
    {
        public int Id { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string? NameTask { get; set; }
        public bool State { get; set; }
        public int AssignedParticipantId { get; set; }
        public Participant? AssignedParticipant { get; set; }
        public int EventId { get; set; }
        public Event? Event { get; set; }

    }
}
