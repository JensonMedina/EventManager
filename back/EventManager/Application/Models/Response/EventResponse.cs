﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Response
{
    public class EventResponse
    {
        public int Id { get; set; }
        public string? EventName { get; set; }
        public DateTimeOffset? EventDate { get; set; }
        public string? EventLocation { get; set; }
        public string? EventDescription { get; set; }
    }
}