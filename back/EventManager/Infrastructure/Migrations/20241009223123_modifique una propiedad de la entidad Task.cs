using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class modifiqueunapropiedaddelaentidadTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LevelImportance",
                table: "Tasks",
                newName: "AssginedParticipantId");

            migrationBuilder.AddColumn<int>(
                name: "AssignedParticipantId",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Participants_AssginedParticipantId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_AssginedParticipantId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "AssignedParticipantId",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "AssginedParticipantId",
                table: "Tasks",
                newName: "LevelImportance");
        }
    }
}
