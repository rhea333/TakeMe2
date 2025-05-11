namespace Backend.Services
{
    public interface IUsersServices
    {
        Task<List<string>> GetUsers();
    }
}
