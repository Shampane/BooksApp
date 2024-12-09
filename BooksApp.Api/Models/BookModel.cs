using System.ComponentModel.DataAnnotations;

namespace BooksApp.Api.Models;

public class BookModel(string title, string author, int rating)
{
    [Key]
    public Guid Id { get; set; }
    [DataType(DataType.Text)]
    public string Title { get; set; } = title;
    [DataType(DataType.Text)]
    public string Author { get; set; } = author;
    public int Rating { get; set; } = rating;
}