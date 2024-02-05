using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeesService.Models
{
    public class AssignedCoursesModel
    {
        public int Id { get; set; }
        public string CourseId { get; set; }
        public string CourseTitle { get; set; }
        public string CourseDescription { get; set; }

        public int EmployeesModelId { get; set; }
        [ForeignKey("EmployeesModelId")]
        public EmployeesModel Employee { get; set; }
    }
}
