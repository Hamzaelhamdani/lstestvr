namespace VenturesRoomBackend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Image { get; set; }
        public int StartupId { get; set; }
        public Startup Startup { get; set; }
        public decimal Price { get; set; }
        public double DiscountPercent { get; set; }
        public string Category { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
} 