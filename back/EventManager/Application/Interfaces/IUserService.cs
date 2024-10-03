using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<UserResponse> AddUserAsync(UserRequest request);
        Task<UserResponse?> GetUserProfileAsync(int idUser);
    }
}
