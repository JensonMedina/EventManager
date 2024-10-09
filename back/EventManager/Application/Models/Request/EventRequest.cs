namespace Application.Models.Request
{
    public class EventRequest
    {
        public string? EventName { get; set; }
        public DateTime? EventDate { get; set; }
        public string? EventLocation { get; set; }
        public string? EventDescription { get; set; }
    }
}
