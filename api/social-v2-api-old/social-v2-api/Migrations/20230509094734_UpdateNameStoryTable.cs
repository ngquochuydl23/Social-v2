using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNameStoryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_StoryEntity_StoryId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Like_StoryEntity_StoryId",
                table: "Like");

            migrationBuilder.DropForeignKey(
                name: "FK_StoryEntity_User_CreatorId",
                table: "StoryEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StoryEntity",
                table: "StoryEntity");

            migrationBuilder.RenameTable(
                name: "StoryEntity",
                newName: "Story");

            migrationBuilder.RenameIndex(
                name: "IX_StoryEntity_CreatorId",
                table: "Story",
                newName: "IX_Story_CreatorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Story",
                table: "Story",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Story_StoryId",
                table: "Comment",
                column: "StoryId",
                principalTable: "Story",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Like_Story_StoryId",
                table: "Like",
                column: "StoryId",
                principalTable: "Story",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Story_User_CreatorId",
                table: "Story",
                column: "CreatorId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Story_StoryId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Like_Story_StoryId",
                table: "Like");

            migrationBuilder.DropForeignKey(
                name: "FK_Story_User_CreatorId",
                table: "Story");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Story",
                table: "Story");

            migrationBuilder.RenameTable(
                name: "Story",
                newName: "StoryEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Story_CreatorId",
                table: "StoryEntity",
                newName: "IX_StoryEntity_CreatorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StoryEntity",
                table: "StoryEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_StoryEntity_StoryId",
                table: "Comment",
                column: "StoryId",
                principalTable: "StoryEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Like_StoryEntity_StoryId",
                table: "Like",
                column: "StoryId",
                principalTable: "StoryEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoryEntity_User_CreatorId",
                table: "StoryEntity",
                column: "CreatorId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
