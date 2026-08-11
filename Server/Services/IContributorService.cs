using FlowUp.Api.DTOs;

namespace FlowUp.Api.Services;

public interface IContributorService
{
    Task<ContributorDto> CreateAsync(CreateContributorDto dto);
}