using FlowUp.Api.DTOs;
using FlowUp.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FlowUp.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(UserRegisterDto dto)
    {
        var token = await _authService.RegisterAsync(dto);
        
        if (token is null)
        {
            return BadRequest("Este e-mail já está em uso.");
        }

        return Ok(new { Token = token });
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(UserLoginDto dto)
    {
        var token = await _authService.LoginAsync(dto);
        
        if (token is null)
        {
            return Unauthorized("E-mail ou senha incorretos.");
        }

        return Ok(new { Token = token });
    }
}