using Microsoft.EntityFrameworkCore;

namespace Backend.Repo
{
    public class RepoContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public RepoContext(DbContextOptions<RepoContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<Users> Users { get; set; }

        public async Task<List<T>> GetAllItemsAsync<T>() where T : class
        {
            return await Set<T>().ToListAsync();
        }
    }
}
