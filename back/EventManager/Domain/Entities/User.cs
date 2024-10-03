using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        [Column(TypeName = "varchar(20)")]
        public string? Name { get; set; }
        [Column(TypeName = "varchar(20)")]
        public string? LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string? Email { get; set; }
        [Column(TypeName = "varchar(20)")]
        public string? Password { get; set; }
        public List<Event> EventList { get; set; } = new List<Event>();
    }
}
