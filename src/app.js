
import 'dotenv/config'
import express from 'express'
import { dbConnect } from './db/config.js';
import syncDB from './db/init.js';
import authRouter from './route/auth/index.js';


const app= express();
app.use(express.json())
dbConnect()
syncDB().then(()=>{
    console.log("DB is Started")
})
app.use(authRouter)
app.listen(3002, ()=>{
    console.log("Server is started at port 3002 ")
})  