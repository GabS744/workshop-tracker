using Microsoft.AspNetCore.Mvc;
using FlowUp.Api.DTOs;
using FlowUp.Api.Services;
using Microsoft.AspNetCore.Authorization;

namespace FlowUp.Api.Controllers;
[Authorize]
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
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContributorDto>>> GetAll()
    {
        var contributors = await _contributorService.GetAllAsync();
        return Ok(contributors);
    }

    [HttpGet("{id:int}/workshops")]
    public async Task<ActionResult<IEnumerable<WorkshopDto>>> GetWorkshops(int id)
    {
        var workshops = await _contributorService.GetWorkshopsByContributorIdAsync(id);
        return Ok(workshops);
    }
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var success = await _contributorService.DeleteAsync(id);
        
        if (!success)
        {
            return NotFound("Colaborador não encontrado.");
        }

        return NoContent(); 
    }
}