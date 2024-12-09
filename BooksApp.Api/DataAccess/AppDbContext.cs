using BooksApp.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace BooksApp.Api.DataAccess;

public class AppDbContext(IConfiguration configuration) : DbContext
{
    public DbSet<BookModel> Books { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite(configuration.GetConnectionString("Database"));
    }
}