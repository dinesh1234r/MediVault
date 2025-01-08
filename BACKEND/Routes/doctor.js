const express=require('express');
const route=express.Router()
const DoctorSchema=require('../Models/DoctorScheme')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Middleware=require('../Middleware/middleware')

route.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const check=await DoctorSchema.findOne({Email_Address:username});
        if(!check)
        {
            return res.json({
                msg:"Username not valid"
            })
        }
        const pass=await bcrypt.compare(password,check.Password);
        
        if(pass)
        {
            const user=check.Email_Address
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
    catch(err)
    {
        res.json({
            msg:"Error in Doctor's Login"
        })
    }
})

route.post('/passchange',Middleware,async(req,res)=>{
    try{
        const {oldpass,newpass,objectID}=req.body;
        const doctor=await DoctorPatientsSchema.findById({_id:objectID});
        const pass=await bcrypt.compare(oldpass,doctor.password);
        if(pass)
        {
            const hashpassword=await bcrypt.hash(newpass,10);
            const updated=await DoctorPatientsSchema.findByIdAndUpdate({_id:objectID},{password:hashpassword});
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