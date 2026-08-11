using FlowUp.Api.Data;
using FlowUp.Api.Models;
using FlowUp.Api.DTOs;
using Microsoft.EntityFrameworkCore;

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
    public async Task<IEnumerable<ContributorDto>> SearchByNameAsync(string name)
    {
        
        if (string.IsNullOrWhiteSpace(name))
        {
            return new List<ContributorDto>();
        }

        var contributors = await _context.Contributors
            .Where(c => 
                c.FirstName.Contains(name) || 
                c.LastName.Contains(name) || 
                (c.FirstName + " " + c.LastName).Contains(name)
            )
            .ToListAsync();

        return contributors.Select(c => new ContributorDto
        {
            Id = c.Id,
            FirstName = c.FirstName,
            LastName = c.LastName,
            FullName = c.FirstName + " " + c.LastName
        }).ToList();
    }
}