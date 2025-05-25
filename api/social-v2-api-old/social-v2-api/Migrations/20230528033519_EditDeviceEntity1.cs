using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace socialv2api.Migrations
{
    /// <inheritdoc />
    public partial class EditDeviceEntity1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TurnOffComment",
                table: "Device",
                newName: "TurnOffNotification");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TurnOffNotification",
                table: "Device",
                newName: "TurnOffComment");
        }
    }
}
