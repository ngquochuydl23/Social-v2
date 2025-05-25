using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class EditDeviceEntity4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AppVersion",
                table: "Device",
                type: "varchar(10)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AppVersion",
                table: "Device",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(10)");
        }
    }
}
