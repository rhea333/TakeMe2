using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Repo
{
    public class UsersCars
    {
        [Key]
        [MaxLength(255)]
        [ForeignKey("User")]
        public string Email { get; set; } = string.Empty;

        public Users Users { get; set; } = null!;
    }
}
