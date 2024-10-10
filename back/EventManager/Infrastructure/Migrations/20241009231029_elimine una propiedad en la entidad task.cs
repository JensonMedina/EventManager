using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class elimineunapropiedadenlaentidadtask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Participants_AssginedParticipantId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_AssginedParticipantId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "AssginedParticipantId",
                table: "Tasks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssginedParticipantId",
                table: "Tasks",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_AssginedParticipantId",
                table: "Tasks",
                column: "AssginedParticipantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Participants_AssginedParticipantId",
                table: "Tasks",
                column: "AssginedParticipantId",
                principalTable: "Participants",
                principalColumn: "Id");
        }
    }
}
