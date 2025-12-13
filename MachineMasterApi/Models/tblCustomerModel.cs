using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MachineMasterApi.Models
{
    public class CustomerModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CustomerId { get; set; }

        public string? CustomerName { get; set; } = string.Empty;
        public string? MobileNo { get; set; } = string.Empty;
        public string? Email {  get; set; } = string.Empty;
        public string? Address { get; set; } = string.Empty;
        public string? City { get; set; } = string.Empty;
        public string? State { get; set; } = string.Empty;
        public string? GSTIN { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }

        public ICollection<Machine_Status_Info_Model>? _Machine_Status_Infos { get; set; } = new List<Machine_Status_Info_Model>();
    }
}
