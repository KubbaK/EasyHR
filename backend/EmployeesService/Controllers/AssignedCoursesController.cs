using EmployeesService.Data;
using EmployeesService.DTOs;
using EmployeesService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace EmployeesService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignedCoursesController : ControllerBase
    {
        private readonly EmployeesDbContext _context;
        private readonly HttpClient _httpClient;

        public AssignedCoursesController(EmployeesDbContext context, HttpClient Client)
        {
            _context = context;
            _httpClient = Client;
        }

        // GET: api/assignedcourses/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCoursesForEmployee(int id)
        {
            var assignedCourses = await _context.assignedcourses
                .Where(ac => ac.EmployeesModelId == id)
                .ToListAsync();

            return Ok(assignedCourses);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAssignedCourses()
        {
            var assignedCourses = await _context.assignedcourses.ToListAsync();
   
            return Ok(assignedCourses);
        }


        // POST: api/assignedcourses
        [HttpPost]
        public async Task<IActionResult> AssignCoursesToEmployee([FromBody] AssignedCoursesDto assignedCoursesDto)
        {
            var employee = await _context.employees.FindAsync(assignedCoursesDto.EmployeeId);

            if (employee == null)
            {
                return NotFound("Pracownik nie znaleziony.");
            }

            var availableCourses = await GetAvailableCoursesFromCoursesService();
            if (availableCourses == null || availableCourses.Count == 0)
            {
                return NotFound("Brak dostępnych kursów.");
            }

            var courseToAdd = availableCourses.FirstOrDefault(c => c.Title == assignedCoursesDto.Title);
            if (courseToAdd == null)
            {
                return NotFound("Brak takiego kursu.");
            }
            var assignedCoursesToAdd = new AssignedCoursesModel
            {
                CourseId = courseToAdd.Id,
                CourseTitle = courseToAdd.Title,
                CourseDescription = courseToAdd.Description
            };
            
            _context.assignedcourses.Add(assignedCoursesToAdd);
            employee.AssignedCourse.Add(assignedCoursesToAdd);
            await _context.SaveChangesAsync();

            return Ok("Kursy przypisane do pracownika.");

        }

        [HttpDelete("{courseId}")]
        public async Task<IActionResult> UnassignCoursesByCourseId(string courseId)
        {
            var assignedCourses = await _context.assignedcourses
                .Where(ac => ac.CourseId == courseId)
                .ToListAsync();

            if (assignedCourses == null || assignedCourses.Count == 0)
            {
                return NotFound($"Brak przypisanych kursów dla CourseId: {courseId}");
            }

            _context.assignedcourses.RemoveRange(assignedCourses);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<List<CoursesModel>> GetAvailableCoursesFromCoursesService()
        {
            var coursesServiceUrl = "http://courseapi-service:8082/api/courses";

            var response = await _httpClient.GetAsync(coursesServiceUrl);

            List<CoursesModel>? courses = new();

            if (response.IsSuccessStatusCode)
            {
                courses = await response.Content.ReadFromJsonAsync<List<CoursesModel>>();
            }

            return courses;
        }
    }
}
