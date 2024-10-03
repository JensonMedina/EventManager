using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Participant
    {
        public int Id { get; set; }
        [Column(TypeName = "varchar(20)")]
        public string? Name { get; set; }
        [Column(TypeName = "varchar(20)")]
        public string? LastName { get; set; }
        public int EventId { get; set; }
        public Event? Event { get; set; }
    }
}
