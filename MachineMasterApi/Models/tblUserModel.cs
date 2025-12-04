using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MachineApi.Models
{
    public class UserModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int UserId { get; set; }

        public string? UserName { get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public string? Role {  get; set; } = string.Empty;
        public bool? isActive { get; set; }  
        public string? Description {  get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }


    public class UserLoginDataModel
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
