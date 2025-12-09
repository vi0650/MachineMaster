using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MachineMasterApi.Models
{
    public class ProductModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductId { get; set; }
        public string? ProductName { get; set; }

        // FOREIGN KEY
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public CategoryModel? Category { get; set; }

        public bool IsActive { get; set; }
        public string? Description { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string? ProductCode { get; set; }

        public ICollection<MachineModel>? Machines { get; set; } = new List<MachineModel>();
    }
}
