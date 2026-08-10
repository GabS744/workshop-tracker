using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlowUp.Api.Migrations
{
    /// <inheritdoc />
    public partial class AtualizarNomesContributor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "last_name_contributor",
                table: "Contributor",
                type: "varchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "last_name_contributor",
                table: "Contributor");
        }
    }
}
