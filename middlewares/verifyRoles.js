// ... is similar to spread operator that is checking the existing state but 
// lets you use as many parameters to us
const verifyRoles = (...allowedRoles) =>{
    return (req,res,next)=>{
        if(!req?.roles)return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray); passed 
        console.log(req.roles); // coming from jwt
        const result = req.roles.map(r=>rolesArray.includes(r)).find(val=>val == true);
        if(!result){return res.sendStatus(401)}
        next();

    }
}

module.exports = verifyRoles 