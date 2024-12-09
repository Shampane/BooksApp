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
    
    [HttpPut]
    public async Task<IActionResult> Update([FromQuery] Guid id, [FromBody] BooksUpdateRequest request)
    {
        try
        {
            var book = await dbContext.Books.FindAsync(id);
            if (book == null)
                throw new Exception("Book not found");
            book.Title = request.Title;
            book.Author = request.Author;
            book.Rating = request.Rating;

            dbContext.Entry(book).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            logger.LogInformation($"Updated book with Id: '{id}'");
            return Ok($"Updated book with Id: '{id}'");
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
    
    [HttpDelete]
    public async Task<IActionResult> Remove([FromQuery] Guid id)
    {
        try
        {
            var book = await dbContext.Books.FindAsync(id);
            if (book == null)
                throw new Exception("Book not found");
            dbContext.Books.Remove(book);
            await dbContext.SaveChangesAsync();
            logger.LogInformation($"Removed book with Id: '{id}'");
            return Ok($"Removed book with Id: '{id}'");
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return BadRequest(ex.Message);
        }
    }
}