const express=require('express');
const route=express.Router()
const ScanCenterSchema=require('../Models/ScanCenter')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Middleware=require('../Middleware/middleware')

route.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const check=await ScanCenterSchema.findOne({Email_Address:username});
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

route.post('/passchange',Middleware,async(req,res)=>{
    try{
        const {oldpass,newpass,objectID}=req.body;
        const doctor=await ScanCenterSchema.findById({_id:objectID});
        const pass=await bcrypt.compare(oldpass,doctor.password);
        if(pass)
        {
            const hashpassword=await bcrypt.hash(newpass,10);
            const updated=await ScanCenterSchema.findByIdAndUpdate({_id:objectID},{password:hashpassword});
            res.json({
                msg:"Password change Successfully"
            })
        }
        else
        {
            res.json({
                msg:"Old password incorrect"
            })
        }
    }
    catch(err)
    {
        res.json({
            msg:"Something wrong in password change"
        })
    }
})

module.exports=route