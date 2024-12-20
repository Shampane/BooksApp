using System.IdentityModel.Tokens.Jwt;
using BooksApp.Api.Contracts;
using BooksApp.Api.Models;
using BooksApp.Api.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BooksApp.Api.Controllers;

[ApiController]
[Route("api/account")]
public class AccountController(
    UserManager<AppUser> userManager,
    RoleManager<AppRole> roleManager,
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
        if (await userManager.FindByEmailAsync(userDto.Email) != null)
            return BadRequest(new
                UserRegisterResponse(
                    false,
                    "User already exists"
                )
            );
        var result = await userManager.CreateAsync(user, userDto.Password);

        if (!result.Succeeded)
            return BadRequest(new
                UserRegisterResponse(
                    false,
                    "Invalid email or password"
                )
            );

        await userManager.AddToRoleAsync(user, "Guest");

        return Ok(new
            UserRegisterResponse(
                true,
                "Registered user"
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
        var roles = await userManager.GetRolesAsync(user);
        var token = jwtHandler.GenerateJwtToken(user, roles);
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