import express from "express"
import mongoose from "mongoose"
import dns from "node:dns";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()
dns.setServers(["1.1.1.1","8.8.8.8"])



const app = express()//app eka ATHULE SAMPOORNA EXPRESS EKA THIYENWA

app.use(
    cors()
)

app.use(express.json())//middleman



app.use(
    (req,res,next)=>{

        const header = req.header("Authorization")
        
        if(header != null){
            const token = header.replace("Bearer ","")
        

        console.log(token)

        jwt.verify(token,"process.env.JWT_SECRET",

            (error,content)=>{

                if(content == null){
                    console.log("invalid token")

                    res.json({
                        message:"invalid token"
                    })
                    

                }else{
                //console.log(content)
                req.user = content
                next()
                }
            }
        )
        }else{
            next()
        }
        
        


})

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)


//y6tDhJE39JtKfwzB
//visuraliyanage1997asm_db_user 
const mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL).then(
    ()=>{
        console.log("Connected to MongoDB Cluster....")
    }
)

app.listen(5000,
    ()=>{
        console.log("Server is running....")
    }
)






