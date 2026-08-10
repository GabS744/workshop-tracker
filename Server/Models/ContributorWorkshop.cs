namespace FlowUp.Api.Models;

public class ContributorWorkshop
{
    public int ContributorId { get; set; }
    public Contributors Contributor { get; set; } = null!;

    public int WorkshopId { get; set; }
    public Workshops Workshop { get; set; } = null!;
}