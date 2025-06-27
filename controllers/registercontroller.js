const User = require('../model/User');

// installing a package called bcrypt
// for password salt and hash

const bcrypt = require('bcrypt');

const handelNewUser = async (req,res)=>{
    const {user,password} = req.body;
    if(!user||!password){
        // status will set the status code but won;t end the response

        return res.status(400).json({'message':"username and passsword required"});
    }
    // check for  duplicate but in case of set status , we will end the response
    
    const duplicate = await User.findOne({username:user}).exec();
    if(duplicate){
        return res.status(400).json({'message':"user already exist"});
    }
    try{
        // encrypt the password
        const hashpwd = await bcrypt.hash(password,10);
        // create and store the new user 
        const result = await User.create({"username":user,"password":hashpwd,
        });
        //const newUser = new User();
        //newUser.username = ""

        
        
        console.log(result);
        res.status(201).json({'success':'new user created'});

    }catch(error){
        res.status(500).json({'message':error.message});
    }
}

module.exports = {handelNewUser};