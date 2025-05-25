using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class EditAlbumEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Count",
                table: "Album",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "Thumbnail",
                table: "Album",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "Album");

            migrationBuilder.DropColumn(
                name: "Thumbnail",
                table: "Album");
        }
    }
}
