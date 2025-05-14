using System.ComponentModel.DataAnnotations;

namespace Backend.JsonModels
{
    public class RegisterUserRequest
    {
        [Required]
        public required SchoolInfo School { get; set; }

        [Required]
        public required GeneralInfo General { get; set; }

        [Required]
        public required ProfileInfo Profile { get; set; }

        public CarInfo? Car_Info { get; set; }
    }

    public class SchoolInfo
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public required string Email { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Type { get; set; }

        [Required]
        public required string Program { get; set; }

        [Required]
        public required int Year { get; set; }
    }

    public class GeneralInfo
    {
        [Required]
        public required string First_Name { get; set; }

        [Required]
        public required string Last_Name { get; set; }

        [Required]
        public required string Password { get; set; }

        [Required]
        public required string Pronouns { get; set; }

        [Required]
        public required DateTime Birthday { get; set; }
    }

    public class ProfileInfo
    {
        [Required]
        public required string Bio { get; set; }

        [Required]
        public required string Interests { get; set; }

    }

    public class CarInfo
    {
        [Required]
        public required string Make { get; set; }

        [Required]
        public required string Model { get; set; }

        [Required]
        public required string Plate_Num { get; set; }
    }
}
