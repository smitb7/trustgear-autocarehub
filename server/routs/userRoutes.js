const express = require('express')


const {getUsers, updateUser, getUsersbyId, deleteUserbyId, auth} = require("../controllers/userControllers")

// define users router 
const usersRouter = express.Router()


usersRouter.get("/", getUsers)
usersRouter.get("/:id", getUsersbyId)
usersRouter.put("/:id", updateUser)
usersRouter.delete("/:id", deleteUserbyId)
usersRouter.post("/sign-up", auth)


module.exports = {usersRouter}