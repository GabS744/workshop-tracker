using FlowUp.Api.DTOs;

namespace FlowUp.Api.Services;

public interface IContributorService
{
    Task<ContributorDto> CreateAsync(CreateContributorDto dto);
    Task<ContributorDto?> UpdateAsync(int id, UpdateContributorDto dto);
    Task<IEnumerable<ContributorDto>> SearchByNameAsync(string name);
    Task<IEnumerable<ContributorDto>> GetAllAsync();
    Task<IEnumerable<WorkshopDto>> GetWorkshopsByContributorIdAsync(int contributorId);
    Task<bool> DeleteAsync(int id);
}