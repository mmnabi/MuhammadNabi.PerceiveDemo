using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MuhammadNabi.PerceiveDemo.Web.Models.DbModels;
using MuhammadNabi.PerceiveDemo.Web.Models.Settings;
using MuhammadNabi.PerceiveDemo.Web.Models.ViewModels;
using MuhammadNabi.PerceiveDemo.Web.Services.Abstractions;
using MuhammadNabi.PerceiveDemo.Web.Utilities;

namespace MuhammadNabi.PerceiveDemo.Web.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserService(
            IOptions<PerceiveDatabaseSettings> perceiveDatabaseSettings,
            IMongoClient mongoClient)
        {
            var mongoDatabase = mongoClient.GetDatabase(perceiveDatabaseSettings.Value.DatabaseName);

            _usersCollection = mongoDatabase
                .GetCollection<User>(PerceiveDbCollectionNames.UsersCollectionName);
        }

        public async Task<List<User>> GetAsync() =>
            await _usersCollection.Find(_ => true).ToListAsync();

        public async Task<User> GetAsync(string id) =>
            await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(User newUser) =>
            await _usersCollection.InsertOneAsync(newUser);

        public async Task UpdateAsync(string id, User updatedUser) =>
            await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

        public async Task RemoveAsync(string id) =>
            await _usersCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<bool> IsUserNameUnique(string userName) =>
            await _usersCollection.Find(x => x.UserName == userName).AnyAsync();

        public async Task<RegistrationResponseDto> RegisterUser(RegisterUserDto userVm)
        {
            var errors = new List<string>();
            // check username uniqueness
            if (!await IsUserNameUnique(userVm.UserName))
                errors.Add($"There is already a user with \"{userVm.UserName}\" username.");

            // password strength check
            if (!IsPasswordStrong(userVm.Password))
                errors.Add("Password is not strong enough.");

            if (errors.Any())
                return new RegistrationResponseDto { Errors = errors };

            var user = new User
            {
                UserName = userVm.UserName,
                Password = userVm.Password,
                DateOfBirth = userVm.DateOfBirth,
                Email = userVm.Email
            };

            await _usersCollection.InsertOneAsync(user);

            return new RegistrationResponseDto { IsSuccessfulRegistration = true };
        }

        public bool IsPasswordStrong(string password)
        {
            PasswordScore passwordStrengthScore = PasswordAdvisor.CheckStrength(password);
            switch (passwordStrengthScore)
            {
                case PasswordScore.Blank:
                case PasswordScore.VeryWeak:
                case PasswordScore.Weak:
                    // Show an error message to the user
                    return false;
                case PasswordScore.Medium:
                case PasswordScore.Strong:
                case PasswordScore.VeryStrong:
                    // Password deemed strong enough
                    return true;
                default: return false;
            }
        }
    }
}
