using System.ComponentModel.DataAnnotations;

namespace social_v2_api.Services.RegisterService.Dtos
{
    public class RequestRegister
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public DateTime Birthday { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Email { get; set; }
    }
}
