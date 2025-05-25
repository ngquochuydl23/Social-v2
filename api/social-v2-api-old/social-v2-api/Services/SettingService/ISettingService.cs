using social_v2_api.Entities;
using social_v2_api.Services.SettingService.ManageAccountDtos;
using social_v2_api.Services.SettingService.SecurityAndPrivacyDtos;

namespace social_v2_api.Services.SettingService
{
  public interface ISettingService
  {

    UserEntity GetUserEntity();
    ResponseChangeAvatar ChangeAvatar(RequestChangeAvatar model);

    ResponseChangeCover ChangeCover(RequestChangeCover model);

    ResponseChangeBio ChangeBio(RequestChangeBio model);

    SecurityAndPrivacyDto GetSecurityAndPrivacy();

    ResponseChangeEmail ChangeEmail(RequestChangeEmail model);

    ResponseChangePhoneNumber ChangePhoneNumber(RequestChangePhoneNumber model);

    ResponseChangePassword ChangePassword(RequestChangePassword model);
  }
}
