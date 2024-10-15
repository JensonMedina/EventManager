namespace Application.Models.Request
{
    public class TaskRequest
    {
        public string? NameTask { get; set; }
        public int AssignedParticipantId { get; set; }
    }
}
