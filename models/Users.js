const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;