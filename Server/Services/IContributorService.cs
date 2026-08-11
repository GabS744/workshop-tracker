using FlowUp.Api.DTOs;

namespace FlowUp.Api.Services;

public interface IContributorService
{
    Task<ContributorDto> CreateAsync(CreateContributorDto dto);
    Task<ContributorDto?> UpdateAsync(int id, UpdateContributorDto dto);
}