namespace FlowUp.Api.Models;

public class Workshops
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;

    public ICollection<ContributorWorkshop> ContributorWorkshops { get; set; } = new List<ContributorWorkshop>();
}