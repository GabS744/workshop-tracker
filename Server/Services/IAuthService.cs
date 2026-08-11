using FlowUp.Api.DTOs;

namespace FlowUp.Api.Services;

public interface IAuthService
{

    Task<string?> RegisterAsync(UserRegisterDto dto);
    Task<string?> LoginAsync(UserLoginDto dto);
    Task<bool> DeleteUserAsync(int id);
    Task<bool> GrantAdminAsync(int id);
    Task<bool> UpdateCredentialsAsync(int userId, UpdateCredentialsDto dto);
    Task<bool> RevokeAdminAsync(int id);

}