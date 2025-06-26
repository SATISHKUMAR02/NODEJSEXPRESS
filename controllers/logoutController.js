const userDB = {
    users:require('../model/users.json'),
    setUsers:function(data){this.users=data}
}
const fsPromises = require('fs').promises;
const path = require('path');
const handleLogOut = async (req,res)=>{
// delete the access token
const cookies = req.cookies;
console.log(cookies);
if(!cookies.jwt){
    return res.sendStatus(403);
}
const user = userDB.users.find(p=>p.refreshToken === refreshToken);
if(!user){
    res.clearCookie('jwt',{httpOnly : truw});
    return res.sendStatus(204);
}
// delete the refresh token
const others = userDB.users.filter(p=>p.refreshToken !== user.refreshToken);
const cur = {...user,refreshToken:''};
userDB.setUsers([...others,cur]);
await fsPromises.writeFile(
    path.join(__dirname,'..','model','users.json'),
    JSON.stringify(userDB.users)
);
res.clearCookie('jwt',{httpOnly:true});
}

module.exports = {handleLogOut}