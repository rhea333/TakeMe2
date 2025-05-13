using System.ComponentModel.DataAnnotations;

namespace Backend.Repo
{
    public class Schools
    {
        [Key]
        [MaxLength(255)]
        public string School_Name { get; set; } = string.Empty;
    }
}
