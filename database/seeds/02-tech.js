exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tech")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("tech").insert([
        {
          techName: "MacBook",
          description: "Gently used MacBook, 17inch screen, lightweight",
          condition: "Like New",
          price: 700,
          ownerId: 1,
          renterId: null,
        },
        {
          techName: "Nintendo Switch Game",
          description: "Animal Crossing Edition",
          condition: "Used",
          price: 30,
          ownerId: 2,
          renterId: null,
        },
        {
          techName: "Samsung Galaxy S10",
          description: "Smartphone that does smart things, your new bestfriend",
          condition: "Like New",
          price: 250,
          ownerId: 2,
          renterId: 3,
        },
        {
          techName: "Play Station 5",
          description: "I am the only one in the world with one",
          condition: "New",
          price: 5000,
          ownerId: 3,
          renterId: null,
        },
        {
          techName: "Speakers",
          description: "They go boom really loud. Great to use late at night",
          condition: "Used",
          price: 65,
          ownerId: 3,
          renterId: 1,
        },
        {
          techName: "Razer Gaming Mouse",
          description: "Black and green with 12 buttons",
          condition: "Open Box",
          price: 80,
          ownerId: 2,
          renterId: 1,
        },
      ]);
    });
};
