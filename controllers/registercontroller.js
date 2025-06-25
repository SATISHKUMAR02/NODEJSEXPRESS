const userDB = {
    users : require('../model/users.json'),
    setUsers : function (data){
        this.users = data;
    }
}
// installing a package called bcrypt
// for password salt and hash
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handelNewUser = async (req,res)=>{
    const {user,password} = req.body;
    if(!user||!password){
        // status will set the status code but won;t end the response

        return res.status(400).json({'message':"username /"});
    }
    // check for  duplicate but in case of set status , we will end the response
    
    const duplicate = userDB.users.find(p=>p.username === user);
    if(duplicate){
        return res.sendStatus(400).json({'message':"user already exist"});
    }
    try{
        // encrypt the password
        const hashpwd = await bcrypt.hash(password,10);
        // store the new user
        const newUser = {"username":user,"password":hashpwd}
        userDB.setUsers([...userDB.users,newUser]);
        fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(userDB.users)
            
        );
        console.log(userDB.users);
        res.status(201).json({'success':'new user created'});

    }catch(error){
        res.status(500).json({'message':error.message});
    }
}

module.exports = {handelNewUser};