const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
const { userRouter } = require("./Routes/userRoutes")
const { postRouter } = require("./Routes/postRoutes")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/employees",postRouter)


app.get("/",(req,res)=>{
    res.send("Welcome to the Home page")
})

app.listen(4000,async(req,res)=>{
    try {
        await connection
        console.log('Connected to MongoDb')
    } catch (error) {
        res.status(400).send({error})
    }
})