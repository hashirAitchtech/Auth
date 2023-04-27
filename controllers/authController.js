const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;
        console.log(req.body);
        if(!username || !password){
            return res.status(400).json({message: 'All fields are required'})
        }

        const user = await User.findOne({ username }).exec();

        if(!user || !user.active){
            return res.status(400).json({message: 'no user found'});
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return res.status(401).json({message: 'Unauthorized'});
        }

        const acceessToken = jwt.sign(
            { "UserInfo": {
                    "username": user.username,
                    "roles": user.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        )

        const refreshToken = jwt.sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            acceessToken
        })
    } catch (error) {
        console.log(error);
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
exports.logout = async (req, res) => {
    try {
        
        const cookie = req.cookies;

        if(!cookies?.jwt) return res.sendStatus(204);

        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });

        res.json({ meesage: 'Cookie cleared' });

        res.status(201).json({
            status: 'success',
            data: 'User logged out'
        })
    } catch (error) {
        res.status(201).json({
            status: 'success',
            error: error
        })
    }
}
exports.refresh = async (req, res) => {
    try {

        const cookies = req.cookies;

        if(!cookies?.jwt){
            return res.status(401).json({message: 'Unauthorized'});
        }

        const refreshToken = cookies.jwt;

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if(err) res.status(403).json({message: 'Forbidden'});

                const foundUser = await User.findOne({username: decoded.username});

                if(!foundUser) return res.status(401).json({message: 'Unauthorized'});

                const acceessToken = jwt.sign(
                    { "UserInfo": {
                            "username": foundUser.username
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10s' }
                )
                
            }
        )

        res.status(201).json({
            status: 'success',
            data: 'User refreshed'
        })
    } catch (error) {
        res.status(401).json({
            status: 'Error',
            error: error
        })
    }
    
}

exports.test = async (req, res) => {
    try {
        const cookie = req.cookies;
        console.log(cookie);
        res.status(200).json({
            status: 'success',
            data: 'test'
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'Error',
            error: error
        })
    }
}