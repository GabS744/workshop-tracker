using Microsoft.EntityFrameworkCore;
using FlowUp.Api.Data;
using FlowUp.Api.Models;
using FlowUp.Api.DTOs;

namespace FlowUp.Api.Services;

public class WorkshopService : IWorkshopService
{
    private readonly AppDbContext _context;

    public WorkshopService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<WorkshopDto>> GetAllAsync()
    {
        var workshops = await _context.Workshops
            .Include(w => w.ContributorWorkshops)
            .ThenInclude(cw => cw.Contributor)
            .ToListAsync();

        return workshops.Select(MapToDto);
    }

    public async Task<WorkshopDto?> GetByIdAsync(int id)
    {
        var workshop = await LoadWorkshopWithContributorsAsync(id);
        return workshop is null ? null : MapToDto(workshop);
    }

    public async Task<IEnumerable<WorkshopDto>> SearchAsync(WorkshopFilterDto filter)
    {
        var workshops = await BuildFilteredQuery(filter).ToListAsync();
        var result = workshops.Select(MapToDto);
        return ApplyParticipantRangeFilter(result, filter);
    }
    
    public async Task<WorkshopDto> CreateAsync(WorkshopDto dto)
    {
        var workshop = new Workshops 
        {
            Name = dto.Name,
            Date = dto.Date,
            Description = dto.Description
        };

        _context.Workshops.Add(workshop);
        await _context.SaveChangesAsync();

        dto.Id = workshop.Id;
        return dto;
    }

    public async Task<bool> AssignContributorsAsync(int workshopId, List<int> contributorIds)
    {
        var workshop = await _context.Workshops
            .Include(w => w.ContributorWorkshops)
            .FirstOrDefaultAsync(w => w.Id == workshopId);

        if (workshop is null) return false;

        var existingIds = workshop.ContributorWorkshops
            .Select(cw => cw.ContributorId)
            .ToHashSet();

        var idsToAdd = contributorIds.Except(existingIds);

        foreach (var contributorId in idsToAdd)
        {
            var contributorExists = await _context.Contributors.AnyAsync(c => c.Id == contributorId);
            if (!contributorExists) continue;

            workshop.ContributorWorkshops.Add(new ContributorWorkshop
            {
                WorkshopId = workshopId,
                ContributorId = contributorId
            });
        }

        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<Workshops?> LoadWorkshopWithContributorsAsync(int id)
    {
        return await _context.Workshops
            .Include(w => w.ContributorWorkshops)
            .ThenInclude(cw => cw.Contributor)
            .FirstOrDefaultAsync(w => w.Id == id);
    }

    private IQueryable<Workshops> BuildFilteredQuery(WorkshopFilterDto filter)
    {
        var query = _context.Workshops
            .Include(w => w.ContributorWorkshops)
            .ThenInclude(cw => cw.Contributor)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter.Nome))
            query = query.Where(w => w.Name.Contains(filter.Nome));

        if (filter.DataInicio.HasValue)
            query = query.Where(w => w.Date >= filter.DataInicio.Value);

        if (filter.DataFim.HasValue)
            query = query.Where(w => w.Date <= filter.DataFim.Value);

        return query;
    }

    private static IEnumerable<WorkshopDto> ApplyParticipantRangeFilter(
        IEnumerable<WorkshopDto> workshops, WorkshopFilterDto filter)
    {
        if (filter.MinParticipantes.HasValue)
            workshops = workshops.Where(w => w.TotalParticipants >= filter.MinParticipantes.Value);

        if (filter.MaxParticipantes.HasValue)
            workshops = workshops.Where(w => w.TotalParticipants <= filter.MaxParticipantes.Value);

        return workshops.ToList();
    }

    private static WorkshopDto MapToDto(Workshops w)
    {
        return new WorkshopDto
        {
            Id = w.Id,
            Name = w.Name,
            Date = w.Date,
            Description = w.Description,
            Contributors = w.ContributorWorkshops
                .Select(cw => new ContributorDto { Id = cw.Contributor.Id, Name = cw.Contributor.FirstName })
                .ToList(),
            TotalParticipants = w.ContributorWorkshops.Count
        };
    }
}