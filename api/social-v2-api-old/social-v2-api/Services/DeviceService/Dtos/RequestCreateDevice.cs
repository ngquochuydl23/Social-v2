using System.ComponentModel.DataAnnotations;

namespace social_v2_api.Services.DeviceService.Dtos
{
    public class RequestCreateDevice
    {
        [Required]
        public string DeviceToken { get; set; }

        [Required]
        public string DeviceName { get; set; }

        [Required]
        public string Platform { get; set; }
    }
}
