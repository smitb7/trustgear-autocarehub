const express = require('express')


const {getUsers} = require("../controllers/userControllers")
// define users router 
const usersRouter = express.Router()


usersRouter.get("/", getUsers)


module.exports = {usersRouter}