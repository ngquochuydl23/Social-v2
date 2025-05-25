using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class EditDeviceEditAppName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AppName",
                table: "Device",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AppName",
                table: "Device",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");
        }
    }
}
