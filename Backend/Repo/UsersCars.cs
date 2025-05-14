using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Repo
{
    public class UsersCars
    {
        [Key]
        [MaxLength(255)]
        [ForeignKey("Users")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public required string Email { get; set; }

        public required Users Users { get; set; }

        [Required]
        [MaxLength(255)]
        public required string Make { get; set; }

        [Required]
        [MaxLength(255)]
        public required string Model { get; set; }

        [Required]
        [MaxLength(255)]
        public required string Plate { get; set; }
    }
}
