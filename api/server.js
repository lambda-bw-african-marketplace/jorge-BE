const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const sellersRouter = require("../auth/sellersRouter")
const customersRouter = require("../auth/customersRouter")
const itemsRouter = require("../items/itemsRouter")
const logger = require("../middleware/logger")


const server = express();
server.use(logger("short"));

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use("/sellers", sellersRouter)
server.use("/customers", customersRouter)
server.use(itemsRouter)

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong, please try again later",
  });
});


server.get("/", (req, res) => {
	res.json({
		message: "Welcome to Build Week Project - African Marketplace",
	})
})

module.exports = server;