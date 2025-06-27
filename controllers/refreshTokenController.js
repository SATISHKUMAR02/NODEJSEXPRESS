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
    // refresh token rotation
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: None });

    console.log("refresh token")
    const user = await User.findOne({ refreshToken }).exec();
    // if the user is detected , meaing refresh token reuse

    if (!user) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                }
                const invalidUser = await User.findOne({
                    username: decoded.username
                }).exec();
                invalidUser.refreshToken = [];
                const result = await invalidUser.save();
                console.log(result);

            }
        )
        return res.sendStatus(403);

    }
    const newRefreshTokenArray = user.refreshToken.filter(f => f !== refreshToken);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                user.refreshToken = [...newRefreshTokenArray];
                const result = await user.save();
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
            const newrefreshToken = jwt.sign(
                {
                    "username": exuser.username
                },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: '1d'
                }
            );
            user.accessToken = accesstoken;
            user.refreshToken = [...newRefreshTokenArray, newrefreshToken];
            res.cookie('jwt', newrefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

            const result = user.save();
            console.log(result);


            res.json({ accesstoken })

        }
    );
};
module.exports = { handleRefreshToken }