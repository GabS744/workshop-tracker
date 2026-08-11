using FlowUp.Api.Data;
using FlowUp.Api.Models;
using FlowUp.Api.DTOs;

namespace FlowUp.Api.Services;

public class ContributorService : IContributorService
{
    private readonly AppDbContext _context;

    public ContributorService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ContributorDto> CreateAsync(CreateContributorDto dto)
    {
        var contributor = new Contributors
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName
        };

        _context.Contributors.Add(contributor);
        await _context.SaveChangesAsync();

        return new ContributorDto
        {
            Id = contributor.Id,
            FirstName = contributor.FirstName,
            LastName = contributor.LastName,
            FullName = contributor.FirstName + " " + contributor.LastName
        };
    }

    public async Task<ContributorDto?> UpdateAsync(int id, UpdateContributorDto dto)
    {

        var contributor = await _context.Contributors.FindAsync(id);

        if (contributor is null) return null;

        contributor.FirstName = dto.FirstName;
        contributor.LastName = dto.LastName;

        await _context.SaveChangesAsync();

        return new ContributorDto
        {
            Id = contributor.Id,
            FirstName = contributor.FirstName,
            LastName = contributor.LastName,
            FullName = contributor.FirstName + " " + contributor.LastName
        };
    }
}