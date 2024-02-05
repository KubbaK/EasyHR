using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CoursesService.Models
{
    public class CoursesModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string?  Id { get; set; }

        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}
