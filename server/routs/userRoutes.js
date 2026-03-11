const express = require('express')


const {getUsers, updateUser, getUsersbyId} = require("../controllers/userControllers")
// define users router 
const usersRouter = express.Router()


usersRouter.get("/", getUsers)
usersRouter.get("/:id", getUsersbyId)
usersRouter.put("/:id", updateUser)


module.exports = {usersRouter}