using System.IdentityModel.Tokens.Jwt;
using BooksApp.Api.Contracts;
using BooksApp.Api.DataAccess;
using BooksApp.Api.Models;
using BooksApp.Api.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BooksApp.Api.Controllers;

[ApiController]
[Route("api/account")]
public class AccountController(
    AppDbContext dbContext,
    UserManager<AppUser> userManager,
    JwtHandler jwtHandler
) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterDto userDto)
    {
        var user = new AppUser
        {
            UserName = userDto.Email,
            Email = userDto.Email
        };
        var result = await userManager.CreateAsync(user, userDto.Password);

        if (result.Succeeded)
            return Ok(new
                UserRegisterResponse(
                    true,
                    "Registered user"
                )
            );

        return BadRequest(new
            UserRegisterResponse(
                false,
                "Invalid email or password"
            )
        );
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto userDto)
    {
        var user = await userManager.FindByEmailAsync(userDto.Email);
        if (user == null || !await userManager.CheckPasswordAsync(user, userDto.Password))
            return Unauthorized(new
                UserLoginResponse(
                    false,
                    "Invalid email or password",
                    null
                )
            );
        var token = await jwtHandler.GenerateJwtTokenAsync(user);
        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return Ok(new
            UserLoginResponse(
                true,
                "Login successful",
                jwt
            )
        );
    }
}