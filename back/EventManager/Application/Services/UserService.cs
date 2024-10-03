using Application.Interfaces;
using Application.Mappings;
using Application.Models.Request;
using Application.Models.Response;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryBase<User> _repository;
        private readonly IUserRepository _userRepository;
        private readonly UserMapping _mapping;

        public UserService(IRepositoryBase<User> repository, IUserRepository userRepository, UserMapping mapping)
        {
            _repository = repository;
            _userRepository = userRepository;
            _mapping = mapping;
        }

        public async Task<UserResponse> AddUserAsync(UserRequest request)
        {
            var exist = await _userRepository.GetUserByUserEmailAsync(request.Email);
            if (exist != null)
            {
                throw new Exception("Ya existe un usuario con este correo.");
            }
            var entity = await _repository.AddAsync(_mapping.FromRequestToEntity(request));
            var response = _mapping.FromEntityToResponse(entity);
            return response;
        }

        public async Task<UserResponse?> GetUserProfileAsync(int idUser)
        {
            var entity = await _repository.GetByIdAsync(idUser);
            if (entity == null)
            {
                return null;
            }
            var response = _mapping.FromEntityToResponse(entity);
            return response;
        }
    }
}
