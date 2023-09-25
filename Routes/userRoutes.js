const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { UserModel } = require("../model/userModel");



const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const userExist=await UserModel.findOne({email})
        if(userExist){
            res.status(200).send({"msg":"User already exists"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(400).send({"error":err})
                }else{
                    const user= new UserModel({...req.body,password:hash})
                    await user.save()
                    res.status(200).send({"res":"New User has been signed Up"})
                }
            })
        }
    } catch (error) {
        res.status(500).send({"error":"Internal Server Error"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.findOne({email})
        if(!user){
            res.status(200).send({"msg":"User does not exists"})
        }else{
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({data:"nemmock"},"masai")
                    res.status(200).send({"msg":"user Logged In",token})
                }else{
                    res.status(400).send({"msg":"Invalid Credentials"})
                }
            })
        }
    } catch (error) {
        res.status(500).send({"error":"Internal Server Error"})
    }
})


module.exports={userRouter}