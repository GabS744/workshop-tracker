using Microsoft.AspNetCore.Mvc;
using FlowUp.Api.DTOs;
using FlowUp.Api.Services;
using Microsoft.AspNetCore.Authorization;

namespace FlowUp.Api.Controllers;
[Authorize]
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

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<WorkshopDto>> Create(CreateWorkshopDto dto)
    {
        var createdWorkshop = await _workshopService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = createdWorkshop.Id }, createdWorkshop);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<WorkshopDto>> Update(int id, UpdateWorkshopDto dto)
    {
        var updatedWorkshop = await _workshopService.UpdateAsync(id, dto);
        
        if (updatedWorkshop is null)
        {
            return NotFound("Workshop não encontrado.");
        }

        return Ok(updatedWorkshop);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var success = await _workshopService.DeleteAsync(id);
        
        if (!success)
        {
            return NotFound("Workshop não encontrado.");
        }
        
        return NoContent(); 
    }
}