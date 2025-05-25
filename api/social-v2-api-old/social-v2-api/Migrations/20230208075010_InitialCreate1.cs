using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(type: "varchar(25)", maxLength: 25, nullable: false),
                    Password = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    FullName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false),
                    LastName = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastLogin = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Avatar = table.Column<string>(type: "text", nullable: true),
                    Bio = table.Column<string>(type: "varchar(255)", nullable: true),
                    Cover = table.Column<string>(type: "text", nullable: true),
                    Birthday = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    PhoneNumber = table.Column<string>(type: "varchar(12)", nullable: true),
                    Email = table.Column<string>(type: "varchar(50)", nullable: true),
                    Gender = table.Column<string>(type: "varchar(10)", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    FollowerCount = table.Column<long>(type: "bigint", nullable: false),
                    FollowingCount = table.Column<long>(type: "bigint", nullable: false),
                    VerifiedEmail = table.Column<bool>(type: "boolean", nullable: false),
                    VerifiedPhoneNumber = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Album",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    Description = table.Column<string>(type: "varchar(255)", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Removable = table.Column<bool>(type: "boolean", nullable: false),
                    CreatorId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Album", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Album_User_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    IsDarkMode = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Client_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Follow",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DestUserId = table.Column<long>(type: "bigint", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Follow", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Follow_User_CreatorUserId",
                        column: x => x.CreatorUserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Follow_User_DestUserId",
                        column: x => x.DestUserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feed",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Caption = table.Column<string>(type: "varchar(2200)", nullable: true),
                    FeedStyle = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreatorId = table.Column<long>(type: "bigint", nullable: false),
                    AlbumId = table.Column<long>(type: "bigint", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feed", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Feed_Album_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "Album",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Feed_User_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Content = table.Column<string>(type: "text", nullable: true),
                    MediaUrl = table.Column<string>(type: "text", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LikeCount = table.Column<long>(type: "bigint", nullable: false),
                    ReplyCount = table.Column<long>(type: "bigint", nullable: false),
                    CreatorId = table.Column<long>(type: "bigint", nullable: false),
                    FeedId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comment_Feed_FeedId",
                        column: x => x.FeedId,
                        principalTable: "Feed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comment_User_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Media",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "text", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<long>(type: "bigint", nullable: false),
                    AlbumId = table.Column<long>(type: "bigint", nullable: true),
                    FeedId = table.Column<long>(type: "bigint", nullable: true),
                    MediaType = table.Column<string>(type: "text", nullable: false),
                    Duration = table.Column<long>(type: "bigint", nullable: true),
                    Viewers = table.Column<long>(type: "bigint", nullable: true),
                    Caption = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Media", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Media_Album_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "Album",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Media_Feed_FeedId",
                        column: x => x.FeedId,
                        principalTable: "Feed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Media_User_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Album_CreatorId",
                table: "Album",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_CreatorId",
                table: "Comment",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_FeedId",
                table: "Comment",
                column: "FeedId");

            migrationBuilder.CreateIndex(
                name: "IX_Feed_AlbumId",
                table: "Feed",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_Feed_CreatorId",
                table: "Feed",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Follow_CreatorUserId",
                table: "Follow",
                column: "CreatorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Follow_DestUserId",
                table: "Follow",
                column: "DestUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_AlbumId",
                table: "Media",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_CreatorId",
                table: "Media",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_FeedId",
                table: "Media",
                column: "FeedId");

            migrationBuilder.CreateIndex(
                name: "IX_User_UserName",
                table: "User",
                column: "UserName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Follow");

            migrationBuilder.DropTable(
                name: "Media");

            migrationBuilder.DropTable(
                name: "Feed");

            migrationBuilder.DropTable(
                name: "Album");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
