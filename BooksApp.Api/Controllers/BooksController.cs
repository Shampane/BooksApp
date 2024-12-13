using BooksApp.Api.Contracts;
using BooksApp.Api.DataAccess;
using BooksApp.Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BooksApp.Api.Controllers;

[ApiController]
[Route("api/books")]
public class BooksController(AppDbContext dbContext, ILogger<BooksController> logger) : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = "Admin, Guest")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var books = await BooksRepository.GetBooksList(dbContext);
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
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] BooksCreateRequest request)
    {
        try
        {
            var book = await BooksRepository.CreateBook(dbContext, request);
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
    [Authorize]
    public async Task<IActionResult> Update([FromQuery] Guid id, [FromBody] BooksUpdateRequest request)
    {
        try
        {
            await BooksRepository.UpdateBook(dbContext, id, request);
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
    [Authorize]
    public async Task<IActionResult> Remove([FromQuery] Guid id)
    {
        try
        {
            await BooksRepository.RemoveBook(dbContext, id);
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