const express=require('express');
const route=express.Router()
const DoctorSchema=require('../Models/DoctorScheme')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Middleware=require('../Middleware/middleware');
const AdminSchema=require('../Models/AdminSchema');
const GoogleVerifyToken=require('../Middleware/GoogleVerifyToken')
const LoginMailAlert=require('../Mail/login')

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
            LoginMailAlert(user)
            const token=jwt.sign({user},'this is your secret key to login in bro');
            const admin=await AdminSchema.findById(check.AdminID)
            return res.json({
                msg:"Username Found",
                objectID:check._id,
                photo:check.Image,
                jwt:token,
                Hospitalname:admin.hospitalName,
                HospitalLogo:admin.logo,
                DoctorDOB:check.DOB,
                DoctorName:check.Doctor_name
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

route.post('/googleauth',async(req,res)=>{
    try{
        const idToken = req.body.idToken;
        if (!idToken) {
            return res.status(400).json({ success: false, msg: "ID token is required" });
          }
        const result = await GoogleVerifyToken(idToken);
        if(!result.success)
        {
            return res.json({
                msg:"Google verification failed"
            })
        }
        const email=result.decodedToken.email
        const check=await DoctorSchema.findOne({Email_Address:email});
        if(!check)
        {
            return res.json({
                msg:"Username not valid"
            })
        }
        LoginMailAlert(email)
        const user=check.Email_Address
        const token=jwt.sign({user},'this is your secret key to login in bro');
        const admin=await AdminSchema.findById(check.AdminID)
        return res.json({
            msg:"Username Found",
            objectID:check._id,
            photo:check.Image,
            jwt:token,
            Hospitalname:admin.hospitalName,
            HospitalLogo:admin.logo,
            DoctorDOB:check.DOB,
            DoctorName:check.Doctor_name
        })
        
    }
    catch(err)
    {
        res.json({
            msg:"Error in Doctor's Login"
        })
    }
})

route.post('/passchange',async(req,res)=>{
    try{
        const {oldpass,newpass,objectID}=req.body;
        const doctor=await DoctorSchema.findById({_id:objectID});
        const pass=await bcrypt.compare(oldpass,doctor.Password);
        if(pass)
        {
            const hashpassword=await bcrypt.hash(newpass,10);
            const updated=await DoctorSchema.findByIdAndUpdate({_id:objectID},{Password:hashpassword});
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