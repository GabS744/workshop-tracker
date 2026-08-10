using FlowUp.Api.DTOs;

namespace FlowUp.Api.Services;

public interface IWorkshopService
{
    Task<IEnumerable<WorkshopDto>> GetAllAsync();
    Task<WorkshopDto?> GetByIdAsync(int id);
    Task<IEnumerable<WorkshopDto>> SearchAsync(WorkshopFilterDto filter);

    Task<WorkshopDto> CreateAsync(WorkshopDto dto);
    Task<bool> AssignContributorsAsync(int workshopId, List<int> contributorId);
}