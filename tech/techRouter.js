const express = require("express");
const Tech = require("./techModel.js");
const router = express.Router();

// Get all tech from db - works
router.get("/", (req, res) => {
  Tech.getAll()
    .then((techItems) => {
      res.status(200).json(techItems);
    })
    .catch((error) => {
      res.status(500).json({ error, error: "Something went wrong." });
    });
});

// Get tech by id - works
router.get("/:id", (req, res) => {
  Tech.findById(req.params.id)
    .then((techItem) => {
      if (techItem) {
        res.status(200).json(techItem);
      } else {
        res.status(404).json({ error: "The tech item could not be found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error, error: "Something went wrong." });
    });
});

// Update a Tech Item - works
router.put("/:id", (req, res) => {
  Tech.findById(req.params.id)
    .then((techItem) => {
      if (techItem) {
        Tech.update(req.body, req.params.id)
          .then((changed) => {
            res.status(200).json(changed);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.status(404).json({ error: "Tech item could not be found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error, error: "Something went wrong." });
    });
});

// Deletes Tech by id - works
router.delete("/:id", (req, res) => [
  Tech.findById(req.params.id)
    .then((techItem) => {
      if (techItem) {
        Tech.remove(req.params.id)
          .then((removed) => {
            res.status(200).json({ removed: removed });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.status(404).json({ error: "Tech item could not be found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
    }),
]);

module.exports = router;
