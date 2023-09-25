const jwt=require('jsonwebtoken');


const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try {
            const decoded=jwt.verify(token,"masai")
            if(decoded){
                next()
            }else{
                res.send({"msg":"Invalid Credentials"})
            }
    } catch (error) {
        res.status(400).send({error})
    }
}
module.exports={auth}