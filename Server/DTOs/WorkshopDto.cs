using System.Collections.Generic;
using System;

namespace FlowUp.Api.DTOs;

public class WorkshopDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public int TotalParticipants { get; set; }
    public List<ContributorDto> Contributors { get; set; } = new();
}