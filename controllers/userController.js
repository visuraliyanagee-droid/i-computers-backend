import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

 export function createUser(req,res){

    const data = req.body
    const hashedPassword = bcrypt.hashSync(data.password, 10)
   // res.json({hashedPassword})

    const user = new User({

        email: data.email,
        firstName : data.firstName,
        lastName : data.lastName,
        password : hashedPassword,
        role : data.role
    });

    user.save().then(
        ()=>{
            res.json({
                message: "user created sucessfully"
            })
        }
    )

}

export function loginUser(req,res){

    const email  = req.body.email
    const password = req.body.password

    User.find({
        email:email
    }).then(
        (users)=>{
           if(users[0]==null){
            res.json({
            message : "User not found"
            })
           }else{
            const user = users[0]
            //res.json(user)

            const isPasswordCorrect = bcrypt.compareSync(password,user.password)

            if(isPasswordCorrect){

            const payload ={

                email:user.email,
                firstName:user.firstName,
                lastname:user.lastName,
                role:user.role,
                isEmailVarified:user.isEmailVarified,
                image:user.image

         };

        const token = jwt.sign(payload,"secretkey96$2025",{
            expiresIn: "100h"
        })

        res.json({
            message: "log in successful",
            token:token,
            role:user.role,
        })

        }else{
            res.status(401).json({
                message: "Invalid password"
            })
        }

            
           }  
              }

    )
}


export function isAdmin(req){

    if (req.user==null){
        return false
    }
    if(req.user.role != "admin"){
       return false
    }
    return true

}
