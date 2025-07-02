using Microsoft.EntityFrameworkCore;
using VenturesRoomBackend.Models;

namespace VenturesRoomBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Startup> Startups { get; set; }
        public DbSet<SupportStructure> SupportStructures { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<VIPClub> VIPClubs { get; set; }
        public DbSet<VIPClubBenefit> VIPClubBenefits { get; set; }
        public DbSet<UserSupportStructure> UserSupportStructures { get; set; }
        public DbSet<StartupSupportStructure> StartupSupportStructures { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User <-> SupportStructure many-to-many
            modelBuilder.Entity<UserSupportStructure>()
                .HasKey(us => new { us.UserId, us.SupportStructureId });
            modelBuilder.Entity<UserSupportStructure>()
                .HasOne(us => us.User)
                .WithMany(u => u.LinkedStructures)
                .HasForeignKey(us => us.UserId);
            modelBuilder.Entity<UserSupportStructure>()
                .HasOne(us => us.SupportStructure)
                .WithMany(s => s.LinkedUsers)
                .HasForeignKey(us => us.SupportStructureId);

            // Startup <-> SupportStructure many-to-many
            modelBuilder.Entity<StartupSupportStructure>()
                .HasKey(ss => new { ss.StartupId, ss.SupportStructureId });
            modelBuilder.Entity<StartupSupportStructure>()
                .HasOne(ss => ss.Startup)
                .WithMany(s => s.StructuresLinked)
                .HasForeignKey(ss => ss.StartupId);
            modelBuilder.Entity<StartupSupportStructure>()
                .HasOne(ss => ss.SupportStructure)
                .WithMany(s => s.LinkedStartups)
                .HasForeignKey(ss => ss.SupportStructureId);

            // VIPClubBenefit
            modelBuilder.Entity<VIPClubBenefit>()
                .HasOne(b => b.VIPClub)
                .WithMany(v => v.BenefitsUsed)
                .HasForeignKey(b => b.VIPClubId);
            modelBuilder.Entity<VIPClubBenefit>()
                .HasOne(b => b.Product)
                .WithMany()
                .HasForeignKey(b => b.ProductId);

            // Explicit one-to-one Startup <-> User (Founder)
            modelBuilder.Entity<Startup>()
                .HasOne(s => s.Founder)
                .WithOne(u => u.LinkedStartup)
                .HasForeignKey<Startup>(s => s.FounderId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
} 