namespace Application.Models.Response
{
    public class TaskResponse
    {
        public int Id { get; set; }
        public string? NameTask { get; set; }
        public bool State { get; set; }
        public ParticipantResponse? AssignedParticipant { get; set; }
    }
}
