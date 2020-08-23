const router = require('express').Router()
const Users = require('./usersModel')
const Tech = require('../tech/techModel')

// Return ALL USERS -works
router.get('/', (req, res) => {
    Users.getAll()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({error, error: "Something went wrong."})
    })
})

// Return USERS WITH GIVEN ID - works
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
        res.status(500).json({error, error: "Something went wrong."})
    })
})

// GET owned tech - works
router.get('/:id/owned', (req, res) => {
    Tech.findById(req.params.id)
        .then(user => {
            if (user) {
                Tech.getOwnedTech(req.params.id)
                    .then(techItems => {
                        res.status(200).json(techItems);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({error: 'User could not be found'});
            }
        })
        .catch(error => {
            res.status(500).json({error, error: "Something went wrong."});
        })
})

// GET rented tech - works
router.get('/:id/rented', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                Tech.getRentedTech(req.params.id)
                    .then(techItems => {
                        res.status(200).json(techItems);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({error: 'User could not be found'});
            }
        })
        .catch(error => {
            res.status(500).json({error, error: "Something went wrong."});
        })
})

// POST tech to rent out per user id - works
router.post('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                Tech.add({ ...req.body, ownerId: req.params.id })
                    .then(techItem => {
                        res.status(201).json(techItem);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({ error: 'User could not be found' });
            }
        })
        .catch(error => {
            res.status(500).json({error, error: "Something went wrong."});
        })
})

// DELETE user - works
router.delete('/:id', (req, res) => [
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                Users.remove(req.params.id)
                    .then(removed => {
                        res.status(200).json({ removed: removed })
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({ error: 'User could not be found' });
            }
        })
        .catch(error => {
            res.status(500).json({error, error: "Something went wrong."});
        })
])


module.exports = router