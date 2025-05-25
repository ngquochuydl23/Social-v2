using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class CommnentChild : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ParentId",
                table: "Comment",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comment_ParentId",
                table: "Comment",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Comment_ParentId",
                table: "Comment",
                column: "ParentId",
                principalTable: "Comment",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Comment_ParentId",
                table: "Comment");

            migrationBuilder.DropIndex(
                name: "IX_Comment_ParentId",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Comment");
        }
    }
}
