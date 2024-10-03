using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enum;

namespace Domain.Entities
{
    public class Task
    {
        public int Id { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string? NameTask { get; set; }
        public Importance? LevelImportance { get; set; }
        public bool State { get; set; }
        public int EventId { get; set; }
        public Event? Event { get; set; }

    }
}
