using System.Security.Claims;
using FlowUp.Api.DTOs;
using FlowUp.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlowUp.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly IAuthService _authService;

    public UsersController(IAuthService authService)
    {
        _authService = authService;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var success = await _authService.DeleteUserAsync(id);
        if (!success) return NotFound("Usuário não encontrado.");
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}/grant-admin")]
    public async Task<ActionResult> GrantAdmin(int id)
    {
        var success = await _authService.GrantAdminAsync(id);
        if (!success) return NotFound("Usuário não encontrado.");
        return Ok("O usuário agora é um Administrador.");
    }

    [HttpPut("me/credentials")]
    public async Task<ActionResult> UpdateMyCredentials(UpdateCredentialsDto dto)
    {

        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        var userId = int.Parse(userIdString!);

        var success = await _authService.UpdateCredentialsAsync(userId, dto);
        
        if (!success)
        {
            return BadRequest("Senha atual incorreta, ou o novo e-mail já está em uso.");
        }

        return Ok("Credenciais atualizadas com sucesso! Faça login novamente.");
    }
    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}/revoke-admin")]
    public async Task<ActionResult> RevokeAdmin(int id)
    {
  
        var currentUserIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        var currentUserId = int.Parse(currentUserIdString!);

        if (id == currentUserId)
        {
            return BadRequest("Você não pode remover seus próprios privilégios de administrador.");
        }

        var success = await _authService.RevokeAdminAsync(id);
        
        if (!success) return NotFound("Usuário não encontrado.");
        
        return Ok("Os privilégios de administrador foram removidos com sucesso.");
    }
}