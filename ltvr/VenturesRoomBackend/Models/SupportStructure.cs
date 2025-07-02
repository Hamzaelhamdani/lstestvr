using System.Collections.Generic;

namespace VenturesRoomBackend.Models
{
    public enum SupportStructureType
    {
        VC,
        Incubator,
        Accelerator
    }

    public class SupportStructure
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Logo { get; set; }
        public SupportStructureType Type { get; set; }
        public string Country { get; set; }
        public string ContactEmail { get; set; }
        public double CommissionPercent { get; set; }
        public ICollection<StartupSupportStructure> LinkedStartups { get; set; } = new List<StartupSupportStructure>();
        public ICollection<UserSupportStructure> LinkedUsers { get; set; } = new List<UserSupportStructure>();
    }
} 