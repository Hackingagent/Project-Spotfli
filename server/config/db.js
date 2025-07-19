import mongoose from "mongoose";

export const connectDB = async () => {

    console.log(`MONGO_URI: ${process.env.MONGO_URI}`); 

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout for initial connection
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        console.log(`DATABASE CONNECTED ${conn.connection.host}`);
    } catch(error){
        console.log(error);
        console.log(`ERROR: ${error.message}`);
        process.exit(1);
    }
}