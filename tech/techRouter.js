const express = require('express')
const Tech = require('./techModel.js')
const router = express.Router()

router.get('/', (req,res) => {
    Tech.getAll()
    .then(techItems => {
        res.status(200).json(techItems)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.get('/:id', (req, res) => {
    Tech.findById(req.params.id)
        .then(techItem => {
            if (techItem) {
                res.status(200).json(techItem);
            } else {
                res.status(404).json({ error: 'The tech item could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

// Update a Tech Item
router.put('/:id', (req, res) => {
    Tech.findById(req.params.id)
        .then(techItem => {
            if (techItem) {
                Tech.update(req.body, req.params.id)
                    .then(changed => {
                        res.status(200).json(changed);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({ error: 'Tech item could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.delete('/:id', (req, res) => [
    Tech.findById(req.params.id)
        .then(techItem => {
            if (techItem) {
                Tech.remove(req.params.id)
                    .then(removed => {
                        res.status(200).json({ remove: removed })
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({ error: 'Tech item could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
])

module.exports = router