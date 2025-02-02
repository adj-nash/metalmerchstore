using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "basketId",
                table: "Baskets",
                newName: "BasketId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Baskets",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BasketId",
                table: "Baskets",
                newName: "basketId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Baskets",
                newName: "id");
        }
    }
}
