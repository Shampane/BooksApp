using BooksApp.Api.Contracts;
using BooksApp.Api.DataAccess;
using BooksApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BooksApp.Api.Controllers;

[Controller]
[Route("books")]
public class BooksController(AppDbContext dbContext, ILogger<BooksController> logger) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var books = await dbContext.Books.ToListAsync();
            logger.LogInformation($"Returned {books.Count} books");
            return Ok(books);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BooksCreateRequest request)
    {
        try
        {
            if (request.Rating < 1 || request.Rating > 10)
                throw new Exception("Invalid rating value");
            var book = new BookModel(request.Title, request.Author, request.Rating);
            await dbContext.AddAsync(book);
            await dbContext.SaveChangesAsync();
            logger.LogInformation($"Created '{book.Title}' book");
            return Ok($"Created '{book.Title}' book");
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
}