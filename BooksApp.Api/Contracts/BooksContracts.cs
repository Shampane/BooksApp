using BooksApp.Api.Models;

namespace BooksApp.Api.Contracts;

public record BookCreateRequest(string Title, string Author, int Rating);

public record BookUpdateRequest(string Title, string Author, int Rating);

public record BooksGetResponse(bool Success, List<BookModel>? List, string? ErrorMessage);

public record BookCreateResponse(bool Success, string? Message, string? ErrorMessage);

public record BookUpdateResponse(bool Success, string? Message, string? ErrorMessage);

public record BookRemoveResponse(bool Success, string? Message, string? ErrorMessage);