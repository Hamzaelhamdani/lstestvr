using System.Collections.Generic;

namespace VenturesRoomBackend.Models
{
    public class Startup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Logo { get; set; }
        public int FounderId { get; set; }
        public User Founder { get; set; }
        public string? Website { get; set; }
        public StartupStatus Status { get; set; }
        public ICollection<StartupSupportStructure> StructuresLinked { get; set; } = new List<StartupSupportStructure>();
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }

    public enum StartupStatus
    {
        Pending,
        Approved
    }

    // Join table for many-to-many Startup <-> SupportStructure
    public class StartupSupportStructure
    {
        public int StartupId { get; set; }
        public Startup Startup { get; set; }
        public int SupportStructureId { get; set; }
        public SupportStructure SupportStructure { get; set; }
    }
} 