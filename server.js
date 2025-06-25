const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const cors = require('cors');
const { logger } = require('./middlewares/logEvent')
const  errorHandler  = require('./middlewares/errorHandler');
const { error } = require('console');
const corsOptions = require("./config/corsOption")

// this will be applied for all the routes 
// 

//custom in middlewares
app.use(logger);

app.use(cors(corsOptions)); // cross origin resource sharing



// built in middlewares
app.use(express.urlencoded({ extended: false })); // => this is a middleware which is used when the form data is submitted
app.use(express.json()); // => this is the same for json data
// allowing middlewares to subdir and for main 
app.use('/',express.static(path.join(__dirname, '/public')));
app.use('/subdir',express.static(path.join(__dirname, '/public')));

app.use('/',require('./routers/root'));
// app.use('/subdir',require('./routers/subdir'));
app.use('/employees',require('./routers/api/employee'));
// the above ones are middlewares so will be applied to all the routes
app.use('/register',require('./routers/api/register'));
app.use('/auth',require('./routers/api/auth'));

const one = (req, res, next) => {
    console.log("one");
    next();
}
const one2 = (req, res, next) => {
    console.log("one2");
    next();
}

const one3 = (req, res, next) => {
    console.log("one3");
    res.send("finished");
}

app.get(/\/chain(\.html)?$/, [one, one2, one3]);
app.get(/.*/, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

// app.all('*', (req, res) => {
//     res.status(404);

//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ error: "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });
app.use(errorHandler);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
