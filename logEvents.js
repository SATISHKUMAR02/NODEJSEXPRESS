const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = format(new Date(), 'dd/MM/yyyy\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        const logDir = path.join(__dirname, 'logs');
        if (!fs.existsSync(logDir)) {
            await fsPromises.mkdir(logDir);
        }
        await fsPromises.appendFile(path.join(logDir, logName), logItem);
    } catch (err) {
        console.error('Logging error:', err);
    }
};

module.exports = logEvents;
