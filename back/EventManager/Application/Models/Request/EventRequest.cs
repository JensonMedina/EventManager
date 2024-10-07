using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Request
{
    public class EventRequest
    {
        public string? EventName { get; set; }
        public DateTime? EventDate { get; set; }
        public string? EventLocation { get; set; }
    }
}
