import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB Connected!! :: DB HOST : ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.error("MONGO DB connection failed", error);
        process.exit(1);
    }
}

export default connectDB;