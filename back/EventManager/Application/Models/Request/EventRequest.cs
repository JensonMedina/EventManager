namespace Application.Models.Request
{
    public class EventRequest
    {
        public string? EventName { get; set; }
        public DateTimeOffset? EventDate { get; set; }
        public string? EventLocation { get; set; }
        public string? EventDescription { get; set; }
    }
}
