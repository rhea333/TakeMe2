using Microsoft.EntityFrameworkCore;

namespace Backend.Repo
{
    public class RepoContext(DbContextOptions<RepoContext> options, IConfiguration configuration) : DbContext(options)
    {
        private readonly IConfiguration _configuration = configuration;

        public DbSet<Users> Users { get; set; }
        public DbSet<Schools> Schools { get; set; }
        public DbSet<UsersCars> UsersCars { get; set; }

        public async Task<List<T>> GetAllItemsAsync<T>() where T : class
        {
            return await Set<T>().ToListAsync();
        }
    }
}
