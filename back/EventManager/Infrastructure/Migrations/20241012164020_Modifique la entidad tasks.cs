using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Modifiquelaentidadtasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedParticipantId",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_AssignedParticipantId",
                table: "Tasks",
                column: "AssignedParticipantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Participants_AssignedParticipantId",
                table: "Tasks",
                column: "AssignedParticipantId",
                principalTable: "Participants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Participants_AssignedParticipantId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_AssignedParticipantId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "AssignedParticipantId",
                table: "Tasks");
        }
    }
}
