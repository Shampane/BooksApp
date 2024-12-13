namespace BooksApp.Api.Contracts;

public record UserLoginResponse(bool Success, string Message, string? Token);