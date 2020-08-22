const db = require("../database/dbConfig");

module.exports = {
  getAll,
  add,
  findById,
  findBy,
  remove,
  update
};

function getAll() {
  return db("users");
}

function findBy(filter) {
    return db('users').where(filter)
}

function findById(id) {
  return db("users").where({ id }).first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

async function remove(id) {
    const temp = await db('users').where({ id }).first();
    if (temp) {
        const del = await db('users').where({ id }).del();
        if (del === 1) {
            return temp;
        }
    }
}

function update(changes, id) {
    return db('users').where({ id }).update(changes)
        .then(() => {
            return findById(id);
        })
}