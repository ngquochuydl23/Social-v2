using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class CommnentCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CommentCount",
                table: "Feed",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LikeCount",
                table: "Feed",
                type: "bigint",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentCount",
                table: "Feed");

            migrationBuilder.DropColumn(
                name: "LikeCount",
                table: "Feed");
        }
    }
}
