const User = require('../model/User')
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({
            'message': "no token found"
        })
    }
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    console.log("refresh token")
    const user = await User.findOne({refreshToken}).exec();
    if (!user) {
        return res.sendStatus(403);

    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (user.username !== decoded.username) {
                return res.sendStatus(403);
            }
            const roles = Object.values(user.roles);
            const accesstoken = jwt.sign({
                "userinfor": {
                    "username": decoded.username,
                    "roles": roles
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '120s'
                });
                user.accessToken = accesstoken;
                const result = user.save();
                console.log(result);
                
            
            res.json({ accesstoken })

        }
    );
};
module.exports = { handleRefreshToken }