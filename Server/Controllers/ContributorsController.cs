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
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ContributorDto>> Update(int id, UpdateContributorDto dto)
    {
        var updatedContributor = await _contributorService.UpdateAsync(id, dto);
        
        if (updatedContributor is null)
        {
            return NotFound("Colaborador não encontrado.");
        }

        return Ok(updatedContributor);
    }
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<ContributorDto>>> Search([FromQuery] string name)
    {
        var contributors = await _contributorService.SearchByNameAsync(name);
        
        return Ok(contributors);
    }
}