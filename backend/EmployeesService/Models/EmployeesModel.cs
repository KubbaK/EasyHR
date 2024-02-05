namespace EmployeesService.Models
{
    public class EmployeesModel
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Position { get; set; }

        public List<AssignedCoursesModel> AssignedCourse{ get; set; } = new List<AssignedCoursesModel>();

    }
}
