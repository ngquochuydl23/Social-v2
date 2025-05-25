using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class AddStoryEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Like_Feed_FeedId",
                table: "Like");

            migrationBuilder.AddColumn<long>(
                name: "StoryId",
                table: "Like",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "StoryId",
                table: "Comment",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StoryEntity",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatorId = table.Column<long>(type: "bigint", nullable: false),
                    LikeCount = table.Column<long>(type: "bigint", nullable: false),
                    CommentCount = table.Column<long>(type: "bigint", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    MediaType = table.Column<string>(type: "text", nullable: false),
                    Duration = table.Column<long>(type: "bigint", nullable: true),
                    Viewers = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoryEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StoryEntity_User_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Like_StoryId",
                table: "Like",
                column: "StoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_StoryId",
                table: "Comment",
                column: "StoryId");

            migrationBuilder.CreateIndex(
                name: "IX_StoryEntity_CreatorId",
                table: "StoryEntity",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_StoryEntity_StoryId",
                table: "Comment",
                column: "StoryId",
                principalTable: "StoryEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Like_Feed_FeedId",
                table: "Like",
                column: "FeedId",
                principalTable: "Feed",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Like_StoryEntity_StoryId",
                table: "Like",
                column: "StoryId",
                principalTable: "StoryEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_StoryEntity_StoryId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Like_Feed_FeedId",
                table: "Like");

            migrationBuilder.DropForeignKey(
                name: "FK_Like_StoryEntity_StoryId",
                table: "Like");

            migrationBuilder.DropTable(
                name: "StoryEntity");

            migrationBuilder.DropIndex(
                name: "IX_Like_StoryId",
                table: "Like");

            migrationBuilder.DropIndex(
                name: "IX_Comment_StoryId",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "StoryId",
                table: "Like");

            migrationBuilder.DropColumn(
                name: "StoryId",
                table: "Comment");

            migrationBuilder.AddForeignKey(
                name: "FK_Like_Feed_FeedId",
                table: "Like",
                column: "FeedId",
                principalTable: "Feed",
                principalColumn: "Id");
        }
    }
}
