using System;
using System.Collections.Generic;

namespace VenturesRoomBackend.Models
{
    public class VIPClub
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public User Member { get; set; }
        public bool Active { get; set; }
        public DateTime DateJoined { get; set; }
        public ICollection<VIPClubBenefit> BenefitsUsed { get; set; } = new List<VIPClubBenefit>();
    }

    public class VIPClubBenefit
    {
        public int Id { get; set; }
        public int VIPClubId { get; set; }
        public VIPClub VIPClub { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public DateTime UsedOn { get; set; }
    }
} 