
import mongoose from 'mongoose';
import { DATABASE_NAME } from '../utils/constants.js';

export const connectDB  = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.DATABASE_URL}/${DATABASE_NAME},`);
        console.log("DATABASE CONNECTED ! HOST ", connection.connection.host);
    } catch (error) {
        console.log("Error occured while connecting to database ", error);
    }
}