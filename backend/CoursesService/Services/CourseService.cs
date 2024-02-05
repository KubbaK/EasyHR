using MongoDB.Driver;
using CoursesService.Models;

namespace CoursesService.Services
{
    public class CourseService
    {
        private readonly IMongoCollection<CoursesModel> _courses;

        public CourseService(IMongoClient mongoClient, IMongoDbSettings mongoDbSettings)
        {
            var database = mongoClient.GetDatabase(mongoDbSettings.DatabaseName);
            _courses = database.GetCollection<CoursesModel>("courses");
        }

        public IEnumerable<CoursesModel> GetCourses()
        {
            return _courses.Find(course => true).ToList();
        }

        public CoursesModel AddCourses(CoursesModel course)
        {
            _courses.InsertOne(course);
            return course;
        }

        public CoursesModel DeleteCourse(string courseId)
        {
            var filter = Builders<CoursesModel>.Filter.Eq("Id", courseId);
            var deletedCourse = _courses.FindOneAndDelete(filter);


            return deletedCourse;
        }
    }
}

