using MuhammadNabi.PerceiveDemo.Web.Models.DbModels;

namespace MuhammadNabi.PerceiveDemo.Web.Services.Abstractions
{
    public interface IUserService
    {
        Task CreateAsync(User newUser);
        Task<List<User>> GetAsync();
        Task<User> GetAsync(string id);
        Task RemoveAsync(string id);
        Task UpdateAsync(string id, User updatedUser);
    }
}