const User = require('../models/Users');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'true',
            data: users
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            err: error
        })
    }
}

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        // const users = User.find().select('-password').lean();
        const users = await User.find().select('-password').lean();
        console.log(users);
        res.status(200).json({
            status: 'true',
            data: users
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            err: error
        })
    }
}

// Create a new user
exports.register = async (req, res) => {
    try {
        const { username, password, roles } = req.body;

        // if (!username || !password || !Array.isArray(roles) || !roles.length) {
        //     return res.status(400).json({
        //         message: 'All fields are required',
        //     })
        // }

        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        const userObj = {username, password: hashedPassword, roles}

        const newUser = await User.create(userObj);
        res.status(201).json({
            status: 'success',
            data: newUser
        })

    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error
        })
    }

}
exports.logout = (req, res) => {
    res.status(201).json({
        status: 'success',
        data: 'User logged out'
    })
}
exports.refresh = (req, res) => {
    res.status(201).json({
        status: 'success',
        data: 'User refreshed'
    })
}