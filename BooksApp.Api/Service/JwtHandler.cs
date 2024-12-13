using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BooksApp.Api.Models;
using Microsoft.IdentityModel.Tokens;

namespace BooksApp.Api.Service;

public class JwtHandler(IConfiguration configuration)
{
    public JwtSecurityToken GenerateJwtToken(AppUser user, IList<string> roles)
    {
        var jwt = new JwtSecurityToken(
            configuration["Jwt:Issuer"],
            configuration["Jwt:Audience"],
            GetClaims(user, roles),
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

    private List<Claim> GetClaims(AppUser user, IList<string> roles)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName!)
        };
        foreach (var role in roles)
            claims.Add(new Claim(ClaimTypes.Role, role));
        return claims;
    }
}