using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class AddLike : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Like",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreateAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<long>(type: "bigint", nullable: false),
                    FeedId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Like", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Like_Feed_FeedId",
                        column: x => x.FeedId,
                        principalTable: "Feed",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Like_User_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Like_CreatorId",
                table: "Like",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Like_FeedId",
                table: "Like",
                column: "FeedId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Like");
        }
    }
}
