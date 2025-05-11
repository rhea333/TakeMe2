using System.ComponentModel.DataAnnotations;

namespace Backend.Repo
{
    public class Users
    {
        [Key]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Password { get; set; } = string.Empty;
    }
}
