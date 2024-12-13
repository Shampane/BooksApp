using BooksApp.Api.Contracts;
using BooksApp.Api.DataAccess;
using BooksApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BooksApp.Api.Repositories;

public static class BooksRepository
{
    private static async Task<BookModel> FindBookById(AppDbContext dbContext, Guid id)
    {
        var book = await dbContext.Books.FindAsync(id);
        if (book == null)
            throw new Exception("Book not found");
        return book;
    }

    public static async Task<List<BookModel>> GetBooksList(AppDbContext dbContext)
    {
        return await dbContext.Books.ToListAsync();
    }

    public static async Task<BookModel> CreateBook(AppDbContext dbContext, BookCreateRequest request)
    {
        if (request.Rating < 1 || request.Rating > 10)
            throw new Exception("Invalid rating value");
        var book = new BookModel(request.Title, request.Author, request.Rating);
        await dbContext.AddAsync(book);
        await dbContext.SaveChangesAsync();
        return book;
    }

    public static async Task UpdateBook(AppDbContext dbContext, Guid id, BookUpdateRequest request)
    {
        var book = await FindBookById(dbContext, id);
        book.Title = request.Title;
        book.Author = request.Author;
        book.Rating = request.Rating;

        dbContext.Entry(book).State = EntityState.Modified;
        await dbContext.SaveChangesAsync();
    }

    public static async Task RemoveBook(AppDbContext dbContext, Guid id)
    {
        var book = await FindBookById(dbContext, id);
        dbContext.Books.Remove(book);
        await dbContext.SaveChangesAsync();
    }
}