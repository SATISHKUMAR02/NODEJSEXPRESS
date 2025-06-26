const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({
            'message': "no token found"
        })
    }
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    console.log("refresh token")
    const user = userDB.users.find(p => p.refreshToken === refreshToken);
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
            res.json({ accesstoken })
        });
};
module.exports = { handleRefreshToken }