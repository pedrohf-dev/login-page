const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: String,
    password: String
});

const Login = mongoose.model('Login', schema);

module.exports = Login;