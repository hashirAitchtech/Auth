const User = require('../models/Users');

exports.login = async (req, res) => {
    try {
        const users = User.find();
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


exports.register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
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