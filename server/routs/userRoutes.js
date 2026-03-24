const express = require('express')


const {getUsers, updateUser, getUsersbyId, deleteUserbyId, auth, loginUser, logout} = require("../controllers/userControllers")
const authMiddleware = require("../middlewares/authMiddleware")
// define users router 
const usersRouter = express.Router()

usersRouter.get("/",authMiddleware, getUsers)
usersRouter.get("/:id", authMiddleware, getUsersbyId)
usersRouter.put("/:id", authMiddleware, updateUser)
usersRouter.delete("/:id", authMiddleware, deleteUserbyId)
usersRouter.post("/sign-up", auth)
usersRouter.post("/login", loginUser)
usersRouter.post("/logout", authMiddleware, logout)


module.exports = {usersRouter}