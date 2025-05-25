using System.ComponentModel.DataAnnotations;

namespace social_v2_api.Services.SettingService.SecurityAndPrivacyDtos
{
    public class RequestChangeEmail
    {
        [Required]
        public string Email { get; set; }
    }
}
