namespace FlowUp.Api.Models;

public class Contributors
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public ICollection<ContributorWorkshop> ContributorWorkshops { get; set; } = new List<ContributorWorkshop>();
}