using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class ViewedStoryEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Viewers",
                table: "Story",
                newName: "ViewerCount");

            migrationBuilder.CreateTable(
                name: "ViewedStory",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    StoryId = table.Column<long>(type: "bigint", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ViewedStory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ViewedStory_Story_StoryId",
                        column: x => x.StoryId,
                        principalTable: "Story",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ViewedStory_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ViewedStory_StoryId",
                table: "ViewedStory",
                column: "StoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ViewedStory_UserId",
                table: "ViewedStory",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ViewedStory");

            migrationBuilder.RenameColumn(
                name: "ViewerCount",
                table: "Story",
                newName: "Viewers");
        }
    }
}
