const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const Users = require("../users/usersModel");
const { isValid } = require("../users/usersService");

// Register new user and include token
router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = 4;

    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide username and password.",
    });
  }
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user);

          res.status(200).json({
            message: "Welcome to our API, you are now logged in!",
            user,
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid username or password" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({ message: "Please provide username and password." });
  }
});

router.put("/users/:id", (req, res) => {
  if (req.body.password) {
    const rounds = 4;
    const hash = bcryptjs.hashSync(req.body.password, rounds);
    req.body.password = hash;
  }

  Users.findById(req.params.id)
    .then((user) => {
      if (user) {
        Users.update(req.body, req.params.id)
          .then((changed) => {
            res.status(200).json(changed);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.status(404).json({ error: "user could not be found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

function makeJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
