namespace BooksApp.Api.Contracts;

public record BooksCreateRequest(string Title, string Author, int Rating);