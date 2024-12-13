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
            return Ok(new BooksGetResponse
            (
                true,
                books,
                null
            ));
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return BadRequest(new BooksGetResponse
            (
                false,
                null,
                ex.Message
            ));
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] BookCreateRequest request)
    {
        try
        {
            var book = await BooksRepository.CreateBook(dbContext, request);
            logger.LogInformation($"Created '{book.Title}' book");
            return Ok(new BookCreateResponse
            (
                true,
                $"Created {book.Title} book",
                null
            ));
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return BadRequest(new BookCreateResponse
            (
                false,
                "Failed to create book",
                ex.Message
            ));
        }
    }

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update([FromQuery] Guid id, [FromBody] BookUpdateRequest request)
    {
        try
        {
            await BooksRepository.UpdateBook(dbContext, id, request);
            logger.LogInformation($"Updated book with Id: {id}");
            return Ok(new BookUpdateResponse
            (
                true,
                $"Updated book with Id: {id}",
                null
            ));
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return BadRequest(new BookUpdateResponse
            (
                false,
                $"Failed to update book with Id: {id}",
                ex.Message
            ));
        }
    }

    [HttpDelete]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Remove([FromQuery] Guid id)
    {
        try
        {
            await BooksRepository.RemoveBook(dbContext, id);
            logger.LogInformation($"Removed book with Id: {id}");
            return Ok(new BookRemoveResponse
            (
                true,
                $"Removed book with Id: {id}",
                null
            ));
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return BadRequest(new BookRemoveResponse
            (
                false,
                $"Failed to remove book with Id: {id}",
                ex.Message
            ));
        }
    }
}