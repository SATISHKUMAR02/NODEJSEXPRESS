const User = require('../model/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');



const handleAuth = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({ 'message': 'invalid credentials' });

    }
    const exuser = await User.findOne({"username":user}).exec();
    if (!exuser) {
        return res.status(404).json({ 'message': 'user not found' });
    }

    const match = await bcrypt.compare(password, exuser.password);
    if (match) {
        const roles = Object.values(exuser.roles);
        // creating a JWT here
        const accessToken = jwt.sign(
            {
                "userinfo": {
                    "username": exuser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '30s'
            }
        );
        // can send roles in refresh token but not needed since 
        // refresh token is stored in memory
        const refreshToken = jwt.sign(
            {
                "username": exuser.username
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        );
        exuser.accessToken = accessToken;
        exuser.refreshToken = refreshToken;
        const result = await exuser.save();
        console.log(result);
        // setting a cookie to httpOnly so that it cannot be accessed by Javascript making it more secure                                               // one day
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.json({
            'success': `user logged in ${user}`, 'payload': {
                'accesstoken': accessToken,
                'refreshtoken': refreshToken
            }
        });
    } else {
        res.json({ 'message': 'invalid cred' });
    }

}

module.exports = { handleAuth };