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
    }
}
