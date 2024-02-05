using System.ComponentModel.DataAnnotations;

namespace EmployeesService.Models
{
    public class CoursesModel
    {
        [Key]
        public required string Id { get; set; }

        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}