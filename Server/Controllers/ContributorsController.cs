using Microsoft.AspNetCore.Mvc;
using FlowUp.Api.DTOs;
using FlowUp.Api.Services;

namespace FlowUp.Api.Controllers;

[ApiController]
[Route("api/contributors")]
public class ContributorsController : ControllerBase
{
    private readonly IContributorService _contributorService;

    public ContributorsController(IContributorService contributorService)
    {
        _contributorService = contributorService;
    }

    [HttpPost]
    public async Task<ActionResult<ContributorDto>> Create(CreateContributorDto dto)
    {
        var createdContributor = await _contributorService.CreateAsync(dto);

        return Created($"/api/contributors/{createdContributor.Id}", createdContributor);
    }
}