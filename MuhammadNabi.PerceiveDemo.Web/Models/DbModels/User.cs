using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MuhammadNabi.PerceiveDemo.Web.Models.DbModels
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        //[BsonElement("UserName")]
        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public DateTime DateOfBirth { get; set; }

        public string Email { get; set; } = null!;
    }
}
