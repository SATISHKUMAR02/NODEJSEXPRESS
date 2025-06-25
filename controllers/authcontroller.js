const userDB = {
    users : require('../model/users.json'),
    setUsers : function (data){
        this.users = data;
    }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
require('dotenv').config();



const handleAuth = async(req,res)=>{
    const {user,password} = req.body;
    if(!user || !password){
        return res.status(400).json({'message':'invalid credentials'});

    }
    const exuser = userDB.users.find(p=>p.username === user);
    if (!exuser){
        return res.status(404).json({'message':'usern not found'});
    }

    const match = await bcrypt.compare(password,exuser.password);
    if(match){
        // creating a JWT here
        const accessToken = jwt.sign(
            {
                "username":exuser.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:'30s'
            }
        );
         const refreshToken = jwt.sign(
            {
                "username":exuser.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:'1d'
            }
        );

        const others = userDB.users.filter(p=>p.username !== exuser.username);
        const current = {...exuser,refreshToken};
        userDB.setUsers([...others,current]);

        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDB.users)
        );
                                                       // one day
        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000});
        return res.json({'success':`user logged in ${user}`,'payload':{
            'accesstoke':accessToken,
            'refreshtoken':refreshToken
        }}); 
    }else{
        res.json({'message':'invalid cred'});
    }

}

module.exports = {handleAuth};