using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BooksApp.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace BooksApp.Api.Service;

public class JwtHandler(IConfiguration configuration, UserManager<AppUser> userManager)
{
    public async Task<JwtSecurityToken> GenerateJwtTokenAsync(AppUser user)
    {
        var jwt = new JwtSecurityToken(
            configuration["Jwt:Issuer"],
            configuration["Jwt:Audience"],
            await GetClaimsAsync(user),
            expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(configuration["Jwt:ExpirationInMinutes"])),
            signingCredentials: GetSigningCredentials()
        );
        return jwt;
    }

    private SigningCredentials GetSigningCredentials()
    {
        var key = Encoding.UTF8.GetBytes(configuration["JWT:Key"]!);
        var securityKey = new SymmetricSecurityKey(key);
        return new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
    }

    private async Task<List<Claim>> GetClaimsAsync(AppUser user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName!)
        };
        var roles = await userManager.GetRolesAsync(user);
        foreach (var role in roles)
            claims.Add(new Claim(ClaimTypes.Role, role));
        return claims;
    }
}