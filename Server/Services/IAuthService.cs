using FlowUp.Api.DTOs;

namespace FlowUp.Api.Services;

public interface IAuthService
{

    Task<string?> RegisterAsync(UserRegisterDto dto);
    Task<string?> LoginAsync(UserLoginDto dto);
}