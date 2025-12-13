using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MachineMasterApi.Models
{
    public class MachineModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MachineId { get; set; }

        public string? MachineName { get; set; } = string.Empty;

        public int ProductId { get; set; }

        [ForeignKey("ProductId")]
        public ProductModel? Product { get; set; }

        public bool IsActive { get; set; }
        public string? Description { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public ICollection<Machine_Status_Info_Model>? _Machine_Status_Infos { get; set; } = new List<Machine_Status_Info_Model>();
    }
}