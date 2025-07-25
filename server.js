const express = require('express')
const path = require('path');
const dotenv = require('dotenv')

const connectDB = require('./config/db.js')
const helmet = require('helmet')
const cors = require('helmet');
const morgan = require('morgan');
const productroute = require('./routers/productRouter.js');
const { errorMiddleware } = require('./middlewares/error.js');
dotenv.config()

connectDB();
const app = express();

app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))

app.use('/api/v1/products',productroute)
app.use(errorMiddleware)
app.listen(process.env.PORT,()=>{
    console.log("server running")
})


