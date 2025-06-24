// white list will contain only thoses urls that can access the server
// without this , it will all origins to access the server
const whitelist = ['http://localhost:3000','http://localhost:3500'];
const corsOptions = {
    origin:(origin,callback)=>{ // after developement remove this !origin
        if(whitelist.indexOf(origin)!==-1 || !origin){
            callback(null,true); 
        }else{
            callback(new Error("not allowed"));
        }
    },
    optionSuccessStatus:200
}

module.exports = corsOptions;