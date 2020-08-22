const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const authRouter = require('../auth/authRouter')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(logger)


// Routes
server.use("/api", authRouter)


server.get('/', (req, res) => {
  const message = process.env.MESSAGE || "hello from code";

  res.send(`<h2>${message}</h2>`)
})

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}


module.exports = server
