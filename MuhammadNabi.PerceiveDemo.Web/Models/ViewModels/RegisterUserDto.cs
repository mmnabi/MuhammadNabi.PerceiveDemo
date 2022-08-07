using System.ComponentModel.DataAnnotations;

namespace MuhammadNabi.PerceiveDemo.Web.Models.ViewModels
{
    public class RegisterUserDto
    {
        [Required]
        public string UserName { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; } = null!;

        [Required]
        [Min18Years]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
    }

    public class Min18Years : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var user = (RegisterUserDto)validationContext.ObjectInstance;

            var age = DateTime.Today.Year - user.DateOfBirth.Year;

            return (age >= 18)
                ? ValidationResult.Success
                : new ValidationResult("Users should be at least 18 years old");
        }
    }
}
