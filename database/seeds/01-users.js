
const bcryptjs = require("bcryptjs")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "username": "test user1",
          "password": bcryptjs.hashSync("testpw1", 8),
          "firstName": "Jane",
          "lastName": "Doe"
        },
        {
          "username": "test user2",
          "password": bcryptjs.hashSync("testpw2", 8),
          "firstName": "John",
          "lastName": "Doe"
        },
        {
          "username": "test user3",
          "password": bcryptjs.hashSync("testpw3", 8),
          "firstName": "Jack",
          "lastName": "Doe"
        },
      ]);
    });
};
