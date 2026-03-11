const express = require('express')


const {getUsers, updateUser, getUsersbyId, deleteUserbyId} = require("../controllers/userControllers")
const { useReducer } = require('react')
// define users router 
const usersRouter = express.Router()


usersRouter.get("/", getUsers)
usersRouter.get("/:id", getUsersbyId)
usersRouter.put("/:id", updateUser)
usersRouter.delete("/:id", deleteUserbyId)


module.exports = {usersRouter}