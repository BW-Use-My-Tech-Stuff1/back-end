const db = require('../database/dbConfig')

module.exports = {
    getAll,
    findById,
    add
}

// Get ALL tech
function getAll() {
    return db('tech')
}

// Tech by ID
function findById(id) {
    return db('tech').where({id}).first()
}

// Add tech
async function add(techItem) {
    const [id] = await db('tech').insert(techItem)
    return findById(id)
}

