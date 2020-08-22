const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(
  logger(":method :url :status :res[content-length] - :response-time ms")
);
server.use(cors);

server.get("/", (req, res) => {
  res.send("Server is up and running!");
});

module.exports = server;
