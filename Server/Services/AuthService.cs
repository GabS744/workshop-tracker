using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FlowUp.Api.Data;
using FlowUp.Api.DTOs;
using FlowUp.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FlowUp.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<string?> RegisterAsync(UserRegisterDto dto)
    {
        // 1. Verifica se o email já está em uso
        var userExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
        if (userExists) return null;

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = passwordHash
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return GenerateJwtToken(user);
    }

    public async Task<string?> LoginAsync(UserLoginDto dto)
    {

        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == dto.Email);
        if (user is null) return null;

        var isValidPassword = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
        if (!isValidPassword) return null;

        return GenerateJwtToken(user);
    }

    private string GenerateJwtToken(User user)
    {
        var jwtKey = _configuration["Jwt:Key"]!;
        var key = Encoding.ASCII.GetBytes(jwtKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {

            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            }),

            Expires = DateTime.UtcNow.AddHours(8),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}