using BooksApp.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BooksApp.Api.Configuration;

public class RoleConfiguration : IEntityTypeConfiguration<AppRole>
{
    public void Configure(EntityTypeBuilder<AppRole> builder)
    {
        builder.HasData(
            new AppRole
            {
                Id = "ce82dbe6-7387-4d21-b562-3740267a254e",
                Name = "Guest",
                NormalizedName = "GUEST",
                Description = "Guest role"
            }, new AppRole
            {
                Id = "a2cd0b81-887f-4892-be9c-90f3e3d8ca62",
                Name = "Admin",
                NormalizedName = "ADMIN",
                Description = "Admin role"
            }
        );
    }
}