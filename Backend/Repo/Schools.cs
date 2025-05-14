using System.ComponentModel.DataAnnotations;

namespace Backend.Repo
{
    public class Schools
    {
        [Key]
        [MaxLength(255)]
        public required string School_Name { get; set; }
    }
}
