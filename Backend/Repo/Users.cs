using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Repo
{
    public class Users
    {
        [Key]
        [MaxLength(255)]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public required string Email { get; set; }

        [Required]
        public required string PasswordHash { get; set; }

        [Required]
        [MaxLength(255)]
        public required string First_Name { get; set; }

        [Required]
        [MaxLength(255)]
        public required string Last_Name { get; set;}

        [Required]
        [MaxLength(255)]
        public string Pronouns { get; set; } = string.Empty;

        public DateTime Birthday { get; set; } = new DateTime(1900, 1, 1);

        [Required]
        [MaxLength(255)]
        [ForeignKey("Schools")]
        public required string School_Name { get; set; }

        public Schools? Schools { get; set; }

        [Required]
        [MaxLength(255)]
        public string School_Type { get; set; } = string.Empty;

        public int School_Year { get; set; } = -1;

        [Required]
        [MaxLength(255)]
        public string School_Program { get; set; } = string.Empty;

        [Required]
        public string Bio { get; set; } = string.Empty;

        [Required]
        public string Interests { get; set; } = string.Empty;
    }
}
