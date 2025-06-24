const {format} = require('date-fns');
const {v4:uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
//======================= message | filename
const logEvents = async (message,logName)=>{
    const dateTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss \n\n')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logItem);
    }catch(err){
        console.log(err)
    }
}
const logger = (req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt');
    console.log(`${req.method} ==> ${req.path}`);
    next();
}

console.log(format (new Date(),'yyyyMMdd\tHH:mm:ss'))
console.log(uuid())

module.exports ={ logger , logEvents};