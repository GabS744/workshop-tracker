using Microsoft.EntityFrameworkCore;
using FlowUp.Api.Models;

namespace FlowUp.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

// Table definitions for the database context
    public DbSet<Contributors> Contributors => Set<Contributors>();
    public DbSet<Workshops> Workshops => Set<Workshops>();
    public DbSet<ContributorWorkshop> ContributorWorkshops => Set<ContributorWorkshop>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Contributors>(entity =>
        {
            entity.ToTable("Contributor");
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Id).HasColumnName("id_contributor");
            entity.Property(c => c.FirstName)
                  .HasColumnName("first_name_contributor")
                  .HasMaxLength(150)
                  .IsRequired();
            entity.Property(c => c.LastName)
                  .HasColumnName("last_name_contributor")
                  .HasMaxLength(150)
                  .IsRequired();
        });

        modelBuilder.Entity<Workshops>(entity =>
        {
            entity.ToTable("Workshop");
            entity.HasKey(w => w.Id);
            entity.Property(w => w.Id).HasColumnName("id_workshop");
            entity.Property(w => w.Name)
                  .HasColumnName("name_workshop")
                  .HasMaxLength(150)
                  .IsRequired();
            entity.Property(w => w.Date).HasColumnName("date_workshop");
            entity.Property(w => w.Description)
                  .HasColumnName("description_workshop")
                  .HasMaxLength(500);
        });
        modelBuilder.Entity<ContributorWorkshop>(entity =>
        {
            entity.ToTable("Contributor_Workshop");
            entity.HasKey(cw => new { cw.ContributorId, cw.WorkshopId });

            entity.Property(cw => cw.ContributorId).HasColumnName("contributor_id");
            entity.Property(cw => cw.WorkshopId).HasColumnName("workshop_id");

            entity.HasOne(cw => cw.Contributor)
                  .WithMany(c => c.ContributorWorkshops)
                  .HasForeignKey(cw => cw.ContributorId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(cw => cw.Workshop)
                  .WithMany(w => w.ContributorWorkshops)
                  .HasForeignKey(cw => cw.WorkshopId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}