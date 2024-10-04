using Application.Interfaces;
using Application.Models.Request;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Services
{
    public class AuthenticationService : ICustomAuthenticationService
    {
        private readonly IUserRepository _repository;
        private readonly AuthenticationServiceOptions _options;

        public AuthenticationService(IUserRepository repository, IOptions<AuthenticationServiceOptions> options)
        {
            _repository = repository;
            _options = options.Value;
        }

        public async Task<User?> ValidateUserAsync(AuthRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return null;
            }
            var user = await _repository.GetUserByUserEmailAsync(request.Email);
            if (user == null)
            {
                return null;
            }
            if (BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return user;
            }
            return null;
        }
        public async Task<string> Authenticate(AuthRequest request)
        {
            var user = await ValidateUserAsync(request);
            if (user == null)
            {
                throw new Exception("Falló la autenticación de usuario.");
            }

            var securityPassword = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_options.SecretForKey));
            var credentials = new SigningCredentials(securityPassword, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim("sub", user.Id.ToString()),
                new Claim("given_name", user.Name),
            };

            var jwtSecurityToken = new JwtSecurityToken
            (
                _options.Issuer,
                _options.Audience,
                claims,
                DateTime.UtcNow,
                DateTime.UtcNow.AddDays(1),
                credentials
            );
            var tokenToReturn = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            return tokenToReturn.ToString();
        }
    }

    public class AuthenticationServiceOptions
    {
        public const string Authentication = "AuthenticationService";
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string SecretForKey { get; set; }
    }
}
