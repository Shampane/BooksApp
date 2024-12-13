using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BooksApp.Api.Migrations
{
    /// <inheritdoc />
    public partial class MyMigrationII : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a2cd0b81-887f-4892-be9c-90f3e3d8ca62",
                column: "NormalizedName",
                value: "ADMIN");

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "a2cd0b81-887f-4892-be9c-90f3e3d8ca62", "92da8e96-743c-467e-9880-847f77d8579d" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "a2cd0b81-887f-4892-be9c-90f3e3d8ca62", "92da8e96-743c-467e-9880-847f77d8579d" });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a2cd0b81-887f-4892-be9c-90f3e3d8ca62",
                column: "NormalizedName",
                value: "Admin");
        }
    }
}
