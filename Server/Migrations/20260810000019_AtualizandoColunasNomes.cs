using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlowUp.Api.Migrations
{
    /// <inheritdoc />
    public partial class AtualizandoColunasNomes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name_contributor",
                table: "Contributor",
                newName: "first_name_contributer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "first_name_contributer",
                table: "Contributor",
                newName: "name_contributor");
        }
    }
}
