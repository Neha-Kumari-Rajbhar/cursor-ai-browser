import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';

import router from './routers/content.route.js';
import dotenv from 'dotenv'
dotenv.config()

//db connection
connectDb()

const app=express();

//middleware
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    allowedHeaders:["Content-Type"]
    }
));
app.use(express.json());

// app.post("/generate", async (req, res) => {
//     const { prompt } = req.body;

//     // For testing, send dummy data
//     res.json({
//         language: "python",
//         code: `print("Hello from generated code!")`
//     });
// });

app.use("/",router)


const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})