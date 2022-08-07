﻿using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MuhammadNabi.PerceiveDemo.Web.Models.DbModels;
using MuhammadNabi.PerceiveDemo.Web.Models.Settings;
using MuhammadNabi.PerceiveDemo.Web.Services.Abstractions;

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
    }
}