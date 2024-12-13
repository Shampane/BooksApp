namespace BooksApp.Api.Contracts;

public record UserLoginResponse(bool Success, string Message, string? Token);

public record UserRegisterResponse(bool Success, string Message);