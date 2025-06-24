const {logEvents} = require('./logEvent');

const errorhandler = (err,req,res,next)=>{
    logEvents(`${err.name}:${err.message}`,'errorlog.txt')
    console.log(err.stack);
    res.status(500).send(err.message);
}

module.exports  = errorhandler;