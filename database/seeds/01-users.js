
const bcryptjs = require("bcryptjs")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "username": "test user",
          "password": bcryptjs.hashSync("testpw", 8),
          "firstName": "Jane",
          "lastName": "Doe"
        },
      ]);
    });
};
