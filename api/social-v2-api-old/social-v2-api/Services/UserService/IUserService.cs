using social_v2_api.Entities;
using social_v2_api.Services.ProfileService;
using social_v2_api.Services.RegisterService.Dtos;
using social_v2_api.Services.SearchService.Dtos;

namespace social_v2_api.Services.UserService
{
  public interface IUserService
  {
    UserEntity GetEntityById(long? id);

    bool CheckExistsUsername(string userName);
  }
}
