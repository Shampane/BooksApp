using BooksApp.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BooksApp.Api.DataAccess;

public class AppDbContext(IConfiguration configuration) : IdentityDbContext<AppUser>
{
    public DbSet<BookModel> Books { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite(configuration.GetConnectionString("Database"));
    }
}