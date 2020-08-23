const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// Import Routes
const authRouter = require("../auth/authRouter");
const usersRouter = require("../users/usersRouter");
const techRouter = require("../tech/techRouter");
const restricted = require("../auth/restrictedMiddleware");

const server = express();

// Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger);

// Routes
server.use("/api", authRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/tech", restricted, techRouter)

// Root
server.get("/", (req, res) => {
  const message = process.env.MESSAGE || "hello from code";
  res.send(`<h2>${message}</h2>`);
});

// Dev Middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}

module.exports = server;
