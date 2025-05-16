using Backend.JsonModels;
using System.Runtime.CompilerServices;

namespace Backend.Services
{
    public interface IUsersServices
    {
        Task<List<string>> GetUsers();

        Task RegisterUser(RegisterUserRequest req);

        Task uploadRegistrationImages(RegistrationUploadImagesReq req);
    }
}
