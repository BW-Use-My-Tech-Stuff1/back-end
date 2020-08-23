const db = require("../database/dbConfig");

module.exports = {
  getAll,
  findById,
  add,
  update,
  remove,
  getOwnedTech,
  getRentedTech
};

// Get ALL tech
function getAll() {
  return db("tech");
}

// Tech by ID
function findById(id) {
  return db("tech").where({ id }).first();
}

// Add tech
async function add(techItem) {
  const [id] = await db("tech").insert(techItem);
  return findById(id);
}

// Update tech
function update(changes, id) {
  return db("tech")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

// Remove tech
async function remove(id) {
  const temp = await db("tech").where({ id }).first();
  if (temp) {
    const del = await db("tech").where({ id }).del();
    if (del === 1) {
      return temp;
    }
  }
}

// returns all owned items by given owner id
function getOwnedTech(id) {
    return db('users')
        .join('tech', 'users.id', '=', 'tech.ownerId')
        .where('ownerId', id);
}
// returns all rented items by the renter id
function getRentedTech(id) {
    return db('users')
        .join('tech', 'users.id', '=', 'tech.renterId')
        .where('renterId', id);
}
