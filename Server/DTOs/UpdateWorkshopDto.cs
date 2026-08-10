namespace FlowUp.Api.DTOs;

public class UpdateWorkshopDto
{
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public List<int> ContributorIds { get; set; } = new();
}