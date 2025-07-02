namespace VenturesRoomBackend.Models
{
    public enum PaymentStatus
    {
        Pending,
        Paid,
        Refunded
    }

    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int ClientId { get; set; }
        public User Client { get; set; }
        public decimal PricePaid { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public string CommissionSplit { get; set; } // JSON or string representation
    }
} 