import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDb= async()=>{
    try {
        const db=await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`Mongodb connected: ${db.connection.host}`)
    } catch (error) {
        console.error(`error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;