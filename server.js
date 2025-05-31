const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const logEvents = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter { }
const myEmitter = new Emitter();

// Listen for custom log events
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

// Serve file function
const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : null
        );
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;

        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType }
        );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.error(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end('Internal Server Error');
    }
};

// Server creation
const server = http.createServer((req, res) => {
    console.log(req.method, req.url);
    myEmitter.emit('log', `${req.method}\t${req.url}`, 'reqLog.txt');

    const ext = path.extname(req.url);
    let contentType = 'text/html';

    switch (ext) {
        case '.css': contentType = 'text/css'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.json': contentType = 'application/json'; break;
        case '.jpg': contentType = 'image/jpeg'; break;
        case '.png': contentType = 'image/png'; break;
        case '.txt': contentType = 'text/plain'; break;
        default: contentType = 'text/html';
    }

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.endsWith('/')
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // Append .html if no extension and HTML content
    if (!ext && contentType === 'text/html' && !filePath.endsWith('.html')) {
        filePath += '.html';
    }

    // Serve file if it exists
    fs.existsSync(filePath)
        ? serveFile(filePath, contentType, res)
        : (() => {
            // Redirects or 404
            switch (path.basename(filePath)) {
                case 'old-page.html':
                    res.writeHead(301, { 'Location': '/new-page.html' });
                    res.end();
                    break;
                case 'www-page.html':
                    res.writeHead(301, { 'Location': '/' });
                    res.end();
                    break;
                default:
                    serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
            }
        })();
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// setTimeout(() => {
//     myEmitter.emit('log', 'Log event emitted');
// }, 2000);

// if(req.url ==='/' || req.url === 'index.html'){
//     res.statusCode=200;
//     res.setHeader('Content-Type','text/html');
//     filePath=path.join(__dirname,'views','index.html');
//     fs.readFile(filePath,'utf8',(err,data)=>{
//         if(err){
//             console.log(err);
//             res.statusCode=500;
//             res.end("server error");
//             return ;
//         }
//         res.end(data);
//     })
// }
// switch (req.url) {
//     case '/':
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html');
//         filePath = path.join(__dirname, 'views', 'index.html');
//         fs.readFile(filePath, 'utf-8', (err, data) => {
//             if (err) {
//                 console.log(err);
//                 res.statusCode = 500;
//                 res.end("server error");
//                 return;
//             }
//             res.end(data);
//         })
//     default:
//         return null;
// }