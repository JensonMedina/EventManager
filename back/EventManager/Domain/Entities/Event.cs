using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Event
    {
        public int Id { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string? EventName { get; set; }
        public DateTime? EventDate { get; set; }
        public string? EventLocation { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public List<Participant> Participants { get; set; } = new List<Participant>();
        public List<Task> TaskList { get; set; } = new List<Task>();

    }
}
