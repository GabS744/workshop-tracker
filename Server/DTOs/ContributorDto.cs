namespace FlowUp.Api.DTOs;

public class ContributorDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public int TotalWorkshops { get; set; }
}