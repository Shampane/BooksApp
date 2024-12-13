using System.ComponentModel.DataAnnotations;

namespace BooksApp.Api.Models;

public class UserLoginDto
{
    [Required(ErrorMessage = "Email is required")]
    [DataType(DataType.EmailAddress)]
    public required string Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public required string Password { get; set; }
}