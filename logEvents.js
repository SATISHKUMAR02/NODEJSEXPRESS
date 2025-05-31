const { format } = require('date-fns')
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
// it will create a file but we should create the directory as well
const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'dd/MM/yyyy')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            // fs.mkdir('./logs', (err) => {
            //     if (err) throw err;
 
            // })
            await fsPromises.mkdir(path.join(__dirname,'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (err) {
        console.log(err);
    }
}
module.exports = logEvents;

console.log(format(new Date(), 'dd/MM/yyyy \tHH:mm:ss'))
console.log(uuid()); // this will generate a random characters