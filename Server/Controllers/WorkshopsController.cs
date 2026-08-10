using Microsoft.AspNetCore.Mvc;
using FlowUp.Api.DTOs;
using FlowUp.Api.Services;

namespace FlowUp.Api.Controllers;

[ApiController]
[Route("api/workshops")]
public class WorkshopsController : ControllerBase
{
    private readonly IWorkshopService _workshopService;

    public WorkshopsController(IWorkshopService workshopService)
    {
        _workshopService = workshopService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkshopDto>>> GetAll()
    {
        var workshops = await _workshopService.GetAllAsync();
        return Ok(workshops);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<WorkshopDto>> GetById(int id)
    {
        var workshop = await _workshopService.GetByIdAsync(id);
        
        if (workshop is null) 
        {
            return NotFound();
        }
        
        return Ok(workshop);
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<WorkshopDto>>> Search([FromQuery] WorkshopFilterDto filter)
    {
        var workshops = await _workshopService.SearchAsync(filter);
        return Ok(workshops);
    }
}