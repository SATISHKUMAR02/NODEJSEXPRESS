const mongoose = require('mongoose');
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("connected");
    }
    catch(error){
        console.log("failed");
        process.exit(1);
    }
}

module.exports = connectDB