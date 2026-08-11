namespace FlowUp.Api.DTOs;

public class UpdateCredentialsDto
{
    public string CurrentPassword { get; set; } = string.Empty;
    public string? NewEmail { get; set; }
    public string? NewPassword { get; set; } 
}