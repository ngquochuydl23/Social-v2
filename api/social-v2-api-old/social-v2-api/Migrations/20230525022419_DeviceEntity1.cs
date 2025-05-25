using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class DeviceEntity1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DeviceToken",
                table: "Device",
                type: "varchar(256)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(125)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DeviceToken",
                table: "Device",
                type: "varchar(125)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(256)");
        }
    }
}
