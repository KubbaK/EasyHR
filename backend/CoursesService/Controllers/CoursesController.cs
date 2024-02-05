using Microsoft.AspNetCore.Mvc;
using CoursesService.Models;
using CoursesService.Services;
using System.Collections.Generic;
using System.Net.Http;

namespace CoursesService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly CourseService _courseService;
        private readonly HttpClient _httpClient;

        public CoursesController(CourseService courseService, HttpClient Client)
        {
            _courseService = courseService;
            _httpClient = Client;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CoursesModel>> GetCourses()
        {
            var courses = _courseService.GetCourses();
            return Ok(courses);
        }

        [HttpPost]
        public ActionResult<CoursesModel> AddCourses(CoursesModel course)
        {
            var addedCourses = _courseService.AddCourses(course);
            return CreatedAtAction(nameof(GetCourses), addedCourses);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(string id)
        {
            var deletedCourse = _courseService.DeleteCourse(id);

            if (deletedCourse == null)
            {
                return NotFound("Course not found.");
            }

            return NoContent();
        }
    }
}
