namespace social_v2_api.Services.SettingService.SecurityAndPrivacyDtos
{
    public class SecurityAndPrivacyDto
    {
        public string Email { get; set; }

        public bool VerifiedEmail { get; set; }

        public string PhoneNumber { get; set; }

        public bool VerifiedPhoneNumber { get; set; }
    }
}
