const User = require('../model/User');

const handleLogOut = async (req,res)=>{
// delete the access token
const cookies = req.cookies;
console.log(cookies);
if(!cookies.jwt){
    return res.sendStatus(403);
}
const user = await User.findOne({refreshToken}).exec();
if(!user){
    res.clearCookie('jwt',{httpOnly : truw});
    return res.sendStatus(204);
}
// delete the refresh token
user.refreshToken='';
const result = await user.save();
console.log(result);
res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true});
res.sendStatus(204);
}

module.exports = {handleLogOut}