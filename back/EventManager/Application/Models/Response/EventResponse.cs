namespace Application.Models.Response
{
    public class EventResponse
    {
        public int Id { get; set; }
        public string? EventName { get; set; }
        public DateTime? EventDate { get; set; }
        public string? EventLocation { get; set; }
        public string? EventDescription { get; set; }
        public List<ParticipantResponse>? Participants { get; set; }
        public List<TaskReponse>? Tasks { get; set; }
    }
}
