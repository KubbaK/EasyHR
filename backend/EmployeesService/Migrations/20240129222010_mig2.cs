using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeesService.Migrations
{
    /// <inheritdoc />
    public partial class mig2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "AssignedCourses");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "AssignedCourses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
