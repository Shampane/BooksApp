using Microsoft.AspNetCore.Identity;

namespace BooksApp.Api.Models;

public class AppRole : IdentityRole
{
    public string? Description { get; set; }
}