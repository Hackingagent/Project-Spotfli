import mongoose from "mongoose";

export const connectDB = async () => {

    console.log(`MONGO_URI: ${process.env.MONGO_URI}`); 

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DATABASE CONNECTED ${conn.connection.host}`);
    } catch(error){
        console.log(`ERROR: ${error.message}`);
        process.exit(1);
    }
}