using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Repo
{
    public class Users
    {
        [Key]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string First_Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Last_Name { get; set;} = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Pronouns { get; set; } = string.Empty;

        [Required]
        public DateTime Birthday { get; set; } = new DateTime(1900, 1, 1);

        [Required]
        [MaxLength(255)]
        [ForeignKey("Schools")]
        public string School_Name { get; set; } = string.Empty;

        public Schools Schools { get; set; } = null!;

        [Required]
        [MaxLength(255)]
        public string School_Type { get; set; } = string.Empty;

        [Required]
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
