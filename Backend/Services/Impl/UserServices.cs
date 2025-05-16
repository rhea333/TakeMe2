using Backend.BlobStorage;
using Backend.JsonModels;
using Backend.Repo;
using Backend.Utility;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Impl
{
    public class UserServices(RepoContext repo, BlobStorageService blob) : IUsersServices
    {

        private readonly List<string> validImageNames = [ "Profile", "School_Id", "Drivers_License" ];
        public async Task<List<string>> GetUsers()
        {
            return await repo.Users.Select(u => u.Email + " " + u.School_Name + " " + u.Birthday).ToListAsync();
        }

        public async Task RegisterUser(RegisterUserRequest req)
        {
            var generalInfo = req.General;
            var school = req.School;
            var profile = req.Profile;
            var carInfo = req.Car_Info;

            ValidateSchoolIsValid(school.Name);

            var user = new Users
            {
                Email = school.Email,
                PasswordHash = generalInfo.Password,
                First_Name = generalInfo.First_Name,
                Last_Name = generalInfo.Last_Name,
                Pronouns = generalInfo.Pronouns,
                Birthday = generalInfo.Birthday,
                School_Name = school.Name,
                School_Type = school.Type,
                School_Year = school.Year,
                School_Program = school.Program,
                Bio = profile.Bio,
                Interests = profile.Interests,
            };

            repo.Users.Add(user);

            UsersCars car;
            if (carInfo != null)
            {
                car = new UsersCars
                {
                    Email = school.Email,
                    Users = user,
                    Make = carInfo.Make,
                    Model = carInfo.Model,
                    Plate = carInfo.Plate_Num,
                };

                repo.UsersCars.Add(car);
            }

            await repo.SaveChangesAsync();
        }

        private void ValidateSchoolIsValid(string school_name)
        {
            if (!repo.Schools.Any(s => s.School_Name == school_name))
            {
                throw new Exception("Must enter a valid school name");
            }

        }

        public async Task uploadRegistrationImages(RegistrationUploadImagesReq req)
        {
            var images = req.Images;

            var image_names = req.Image_Names;

            var folder = Utilities.GetBlobFolderFromEmail(req.Email);

            ValidateRegistrationImagesInput(req);

            for (int i = 0; i < images.Count; i++)
            {
                var image = images[i];
                var image_name = image_names[i];
                var ext = Path.GetExtension(image.FileName);

                var blobName = $"{folder}/{image_name}";
                await blob.UploadFileAsync(image, blobName, ext);
            }
        }

        private void ValidateRegistrationImagesInput(RegistrationUploadImagesReq req)
        {
            var images = req.Images;

            var image_names = req.Image_Names;

            if (images.Count != image_names.Count)
            {
                throw new Exception("Each file must have their matching name");
            }

            if (image_names.Any(img => !validImageNames.Contains(img)))
            {
                throw new Exception("Inputted image names" + image_names.Select(img => !validImageNames.Contains(img)) + " are not valid");
            }
        }
    }
}
