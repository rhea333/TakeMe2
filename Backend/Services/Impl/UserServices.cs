using Backend.JsonModels;
using Backend.Repo;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Impl
{
    public class UserServices : IUsersServices
    {
        private readonly RepoContext repo;

        public UserServices(RepoContext repo)
        {
            this.repo = repo;
        }

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

            validateSchoolIsValid(school.Name);

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

            repo.SaveChanges();
        }

        private void validateSchoolIsValid(string school_name)
        {
            if (!repo.Schools.Any(s => s.School_Name == school_name))
            {
                throw new Exception("Must enter a valid school name");
            }

        }
    }
}
