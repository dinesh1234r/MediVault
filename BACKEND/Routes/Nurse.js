const express=require('express');
const route=express.Router()
const NursePatientsSchema=require('../Models/NursePatientsScheme')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
// const Middleware=require('../Middleware/middleware')

route.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const check=await NursePatientsSchema.findOne({email:username});
        if(!check)
        {
             res.json({
                msg:"Username not valid"
            })
        }
        else{
        const pass=await bcrypt.compare(password,check.password);
        
        if(pass)
        {
            const user=check.username
            const token=jwt.sign({user},'this is your secret key to login in bro');
            return res.json({
                msg:"Username Found",
                objectID:check._id,
                photo:check.photo,
                jwt:token,
                check
            })
        }
        else
        {
            return res.json({
                msg:"Password incorrect"
            })
        }
        }
    }
    catch(err)
    {
        return res.json({
            msg:"Error in Doctor's Login"
        })
    }
})


module.exports=route