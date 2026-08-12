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
            FullName = contributor.FirstName + " " + contributor.LastName,
            TotalWorkshops = 0
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
            FullName = contributor.FirstName + " " + contributor.LastName,
            TotalWorkshops = await GetTotalWorkshopsAsync(contributor.Id)
        };
    }

    public async Task<IEnumerable<ContributorDto>> SearchByNameAsync(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return new List<ContributorDto>();
        }

        var workshopTotals = await _context.ContributorWorkshops
            .Where(cw => cw.Contributor.FirstName.Contains(name) ||
                         cw.Contributor.LastName.Contains(name) ||
                         (cw.Contributor.FirstName + " " + cw.Contributor.LastName).Contains(name))
            .GroupBy(cw => cw.ContributorId)
            .Select(group => new
            {
                ContributorId = group.Key,
                Total = group.Count()
            })
            .ToDictionaryAsync(item => item.ContributorId, item => item.Total);

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
            FullName = c.FirstName + " " + c.LastName,
            TotalWorkshops = workshopTotals.TryGetValue(c.Id, out var total) ? total : 0
        }).ToList();
    }

    public async Task<IEnumerable<ContributorDto>> GetAllAsync()
    {
        var workshopTotals = await _context.ContributorWorkshops
            .GroupBy(cw => cw.ContributorId)
            .Select(group => new
            {
                ContributorId = group.Key,
                Total = group.Count()
            })
            .ToDictionaryAsync(item => item.ContributorId, item => item.Total);

        var contributors = await _context.Contributors
            .ToListAsync();

        return contributors.Select(c => new ContributorDto
        {
            Id = c.Id,
            FirstName = c.FirstName,
            LastName = c.LastName,
            FullName = c.FirstName + " " + c.LastName,
            TotalWorkshops = workshopTotals.TryGetValue(c.Id, out var total) ? total : 0
        }).ToList();
    }

    public async Task<IEnumerable<WorkshopDto>> GetWorkshopsByContributorIdAsync(int contributorId)
    {
        var workshops = await _context.Workshops
            .Include(w => w.ContributorWorkshops)
                .ThenInclude(cw => cw.Contributor)
            .Where(w => w.ContributorWorkshops.Any(cw => cw.ContributorId == contributorId))
            .ToListAsync();

        return workshops.Select(w => new WorkshopDto
        {
            Id = w.Id,
            Name = w.Name,
            Date = w.Date,
            Description = w.Description,
            TotalParticipants = w.ContributorWorkshops.Count,
            Contributors = w.ContributorWorkshops.Select(cw => new ContributorDto
            {
                Id = cw.Contributor.Id,
                FirstName = cw.Contributor.FirstName,
                LastName = cw.Contributor.LastName,
                FullName = cw.Contributor.FirstName + " " + cw.Contributor.LastName
            }).ToList()
        }).ToList();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var contributor = await _context.Contributors.FindAsync(id);

        if (contributor is null) return false;

        _context.Contributors.Remove(contributor);
        await _context.SaveChangesAsync();

        return true;
    }

    private async Task<int> GetTotalWorkshopsAsync(int contributorId)
    {
        return await _context.ContributorWorkshops
            .CountAsync(cw => cw.ContributorId == contributorId);
    }
}