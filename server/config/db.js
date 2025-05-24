import mongoose from "mongoose";

export const connectDB = async () => {

    const MONGO_URI = "mongodb+srv://devteam:fS2p1S0VCAvKXwK4@spotfli.arkthxs.mongodb.net/?retryWrites=true&w=majority&appName=spotfli";
    console.log(`MONGO_URI: ${MONGO_URI}`);
    // console.log(`MONGO_URI: ${MONGO_URI}`); 

    try{
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`DATABASE CONNECTED ${conn.connection.host}`);
    } catch(error){
        console.log(`ERROR: ${error.message}`);
        process.exit(1);
    }
}