const router = require('express').Router()
const Users = require('./usersModel')

// Return ALL USERS
router.get('/', (req, res) => {
    Users.getAll()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

// Return USERS WITH GIVEN ID
router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({error: "User could not be found with that id."})
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router