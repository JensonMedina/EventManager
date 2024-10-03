using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Mappings
{
    public class UserMapping
    {
        public User FromRequestToEntity(UserRequest request)
        {
            return new User
            {
                Name = request.Name,
                LastName = request.LastName,
                BirthDate = request.BirthDate,
                Email = request.Email,
                Password = request.Password,
            };
        }

        public UserResponse FromEntityToResponse(User entity)
        {
            return new UserResponse
            {
                Id = entity.Id,
                Name = entity.Name,
                LastName = entity.LastName,
                BirthDate = entity.BirthDate,
                Email = entity.Email,
            };
        }
    }
}
