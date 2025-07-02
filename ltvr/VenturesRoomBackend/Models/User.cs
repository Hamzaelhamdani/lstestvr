using System.Collections.Generic;

namespace VenturesRoomBackend.Models
{
    public enum UserRole
    {
        Startup,
        Structure,
        Client,
        Admin
    }

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
        public string? Photo { get; set; }

        // Navigation properties
        public int? LinkedStartupId { get; set; }
        public Startup? LinkedStartup { get; set; }
        public ICollection<UserSupportStructure> LinkedStructures { get; set; } = new List<UserSupportStructure>();
        public ICollection<VIPClub> VIPClubs { get; set; } = new List<VIPClub>();
    }

    // Join table for many-to-many User <-> SupportStructure
    public class UserSupportStructure
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int SupportStructureId { get; set; }
        public SupportStructure SupportStructure { get; set; }
    }
} 