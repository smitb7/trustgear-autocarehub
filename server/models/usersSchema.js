const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    role : {type : String}
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
