﻿namespace Application.Models.Request
{
    public class UserRequest
    {
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
