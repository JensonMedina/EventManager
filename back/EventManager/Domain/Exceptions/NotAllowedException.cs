using System.Net;

namespace Domain.Exceptions
{
    public class NotAllowedException : Exception
    {
        public HttpStatusCode Code { get; set; }
        public string? Msg { get; set; }




        public NotAllowedException(string? message) : base(message)
        {
        }

        public NotAllowedException(HttpStatusCode code, string? msg)
        {
            Code = code;
            Msg = msg;
        }
    }
}
