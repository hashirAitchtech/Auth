const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err) res.status(403).json({message: 'Forbidden'});

            req.user = decoded.UserInfo.username;
            next();
        }
    )
}

module.exports = verifyJWT;