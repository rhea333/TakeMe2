using System.ComponentModel.DataAnnotations;

namespace Backend.JsonModels
{
    public class RegistrationUploadImagesReq
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public required string Email { get; set; }

        [Required]
        public required List<IFormFile> Images { get; set; }

        [Required]
        public required List<string> Image_Names { get; set; }
    }
}
