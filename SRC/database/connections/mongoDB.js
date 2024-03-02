const mongoose = require('mongoose');
require('dotenv').config();
var i = 0;
var connectmongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL,  
            // {
            //     useNewUrlParser: true, 
            //     useUnifiedTopology: true 
            // }
            ).then(()=>console.log("MongoDB connected successfully")
            ).catch((e)=>{
              console.log(`Error while connection patient, Retrying ${i++}`+ e);
              connectDB();
            });
    } catch (error) {
        console.error('MongoDB connection failed', error);
    }
}

module.exports = {connectmongoDB};