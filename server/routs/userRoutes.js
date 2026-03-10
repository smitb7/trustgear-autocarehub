const express = require('express')


const {readUsers} = require("../controllers/userControllers")
// define users router 
const usersRouter = express.Router()


usersRouter.get("/", readUsers)


module.exports = {usersRouter}