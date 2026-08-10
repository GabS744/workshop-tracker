using FlowUp.Api.DTOs;

namespace FlowUp.Api.Services;

public interface IWorkshopService
{
    Task<IEnumerable<WorkshopDto>> GetAllAsync();
    Task<WorkshopDto?> GetByIdAsync(int id);
    Task<IEnumerable<WorkshopDto>> SearchAsync(WorkshopFilterDto filter);
    Task<WorkshopDto> CreateAsync(CreateWorkshopDto dto);
    Task<WorkshopDto?> UpdateAsync(int id, UpdateWorkshopDto dto);
    Task<bool> DeleteAsync(int id);
}