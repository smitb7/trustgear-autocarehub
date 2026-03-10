const express = require('express')


const {getUsers, updateUser} = require("../controllers/userControllers")
// define users router 
const usersRouter = express.Router()


usersRouter.get("/", getUsers)
usersRouter.put("/", updateUser)

module.exports = {usersRouter}