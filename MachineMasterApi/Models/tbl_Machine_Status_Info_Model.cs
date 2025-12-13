using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MachineMasterApi.Models
{
    public class Machine_Status_Info_Model
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public int MachineId { get; set; }

        [ForeignKey("MachineId")]
        public MachineModel? Machine { get; set; }

        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public CustomerModel? Customer { get; set; }

        public bool IsOnline { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? IPAddress { get; set; }
        public string? Location { get; set; }
        public string? MachineCode { get; set; }
    }
}
