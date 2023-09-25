const express=require("express");
const { EmployeeModel } = require("../model/employeeModel");
const { auth } = require("../middlewares/authMiddleware");


const postRouter=express.Router()


postRouter.post("/add",auth,async(req,res)=>{
    try {
        const newEmp=new EmployeeModel(req.body)
        await newEmp.save()
        res.status(200).send({"msg":"new employee added"})
    } catch (error) {
        res.status(500).send({"error":"Internal Server Error"})
    }
})

postRouter.get("/",auth,async(req,res)=>{
    const page=req.query.page || 1;
    const department=req.query.department || ""
    const sort=req.query.sort || ""
    const name=req.query.name || ""
    const limit=req.query.limit || 5;
    const toSkip=limit*(page-1);
    const query={};
    if(department){
        query.department=department
    }
    if(name){
        query.firstName=name
    }
    try {
        const data=await EmployeeModel.find(query).skip(toSkip).limit(limit)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({"error":"Internal Server Error"})
    }
})

postRouter.get("/:id",auth,async(req,res)=>{
    const {id}=req.params;
    try {
        const data=await EmployeeModel.findOne({_id:id})
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({"error":"Internal Server Error"})
    }
})

postRouter.get("/asc",auth,async(req,res)=>{
    const page=req.query.page || 1;
    const department=req.query.department || ""
    const name=req.query.name || ""
    const limit=req.query.limit || 5;
    const toSkip=limit*(page-1);
    const query={};
    if(department){
        query.department=department
    }
    if(name){
        query.firstName=name
    }
    try {
        const data=await EmployeeModel.find(query).skip(toSkip).sort({salary:-1}).limit(limit)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({"error":"Internal Server Error"})
    }
})



postRouter.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params;
    const post=await EmployeeModel.findOne({_id:id})
    try {
        const update=await EmployeeModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"Employee details Updated"})
    } catch (error) {
        res.status(500).send({"error":"Internal Server Error"})
    }
})

postRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params;
    const post=await EmployeeModel.findOne({_id:id})
    try {
        const update=await EmployeeModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"Employee details Deleted"})
    } catch (error) {
        res.status(500).send({"error":"Internal Server Error"})
    }
})


module.exports={postRouter}