const express=require('express')
const route=express.Router()
const bcrypt=require('bcrypt')
const AdminScheme=require('../Models/AdminSchema')
const jwt=require('jsonwebtoken');
const DoctorScheme=require('../Models/DoctorScheme');
const Middleware=require('../Middleware/middleware');
const DoctorPatientsSchema=require('../Models/DoctorPatientsSchema');
const NurseScheme = require('../Models/NurseScheme');
const NursePatientsSchema=require('../Models/NursePatientsScheme')
const ScanCenterSchema=require('../Models/ScanCenter')

route.post('/login',async(req,res)=>{
    try{
    const {adminuser,password}=req.body;
    const Admin=await AdminScheme.findOne({adminuser})
    if(!Admin)
    {
        return res.json({
            msg:"You are Not Authorized"
        })
    }
    const check=await bcrypt.compare(password, Admin.password)
    const token=jwt.sign({adminuser:adminuser},'this is your secret key to login in bro')
    if(check)
    {
        return res.json({
            msg:"Login successful",
            token:token
        })
    }
    else
    {
        return res.json({
            msg:"Wrong Password"
        })
    }
    }
    catch(err){
        return res.json({
            msg:"Error Occured in Admin Login"
        })
    }
})

route.post('/postbyadmin',Middleware,async(req,res)=>{
    const {Admin,Doctor_name,gender,DOB,Email_Address,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,Contract_type,photo}=req.body;
    try{
    const currentdatetime=new Date();
    const currentdate=currentdatetime.toLocaleDateString()
    const currenttime=currentdatetime.toLocaleTimeString();
    const num=currentdatetime.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentday=daysOfWeek[num];
    const hashpassword=await bcrypt.hash(Medical_License_Number,10);
    const doctor=new DoctorScheme({
        Admin,Doctor_name,Gender:gender,DOB,Image:photo,Email_Address,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,Contract_type,Date_Joined:currentdate,
        Time_Joined:currenttime,Day_Joined:currentday
    })
    const newdoctorpatients=new DoctorPatientsSchema({
        email:Email_Address,
        username:Doctor_name,
        password:hashpassword,
        DUID:Medical_License_Number,
        photo:photo
    })
    newdoctorpatients.save()
    doctor.save()
    res.json({
        msg:"Details are saved successfully"
    })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in adddoctor"
        })
    }
})

route.post('/postbyadminfornurse',async(req,res)=>{
    try{
        const {Admin,Doctor_name,gender,DOB,Email_Address,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,photo}=req.body;
        const currentdatetime=new Date();
        const currentdate=currentdatetime.toLocaleDateString()
        const currenttime=currentdatetime.toLocaleTimeString();
        const num=currentdatetime.getDay();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentday=daysOfWeek[num];
        const hashpassword=await bcrypt.hash(Medical_License_Number,10);
        const nurse=new NurseScheme({
            Admin,Doctor_name,Gender:gender,DOB,Image:photo,Email_Address,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,Date_Joined:currentdate,
            Time_Joined:currenttime,Day_Joined:currentday
        })
        const newnursepatients=new NursePatientsSchema({
            email:Email_Address,
            username:Doctor_name,
            password:hashpassword,
            NUID:Medical_License_Number,
            photo:photo
        })
        newnursepatients.save()
        nurse.save()
        res.json({
            msg:"Details are saved successfully"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in addnurse"
        })
    }
})
route.post('/getalldetailsofdoctor',Middleware,async(req,res)=>{
    try{
        const {Admin} =req.body
        const details=await DoctorScheme.find({Admin});
        if(details.length!=0)
        {
            return res.json({
                msg:"Details are shown below",
                details
            })
        }
        return res.json({
            msg:"No Details are found"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in getting details"
        })
    }
})

route.post('/getalldetailsofnurse',Middleware,async(req,res)=>{
    try{
        const {Admin} =req.body
        const details=await NurseScheme.find({Admin});
        if(details.length!=0)
        {
            return res.json({
                msg:"Details are shown below",
                details
            })
        }
        return res.json({
            msg:"No Details are found"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in getting details"
        })
    }
})

route.post('/deletedetail',Middleware,async(req,res)=>{
    try{
        const {Medical_License_Number}=req.body;
        const check=await DoctorScheme.deleteOne({Medical_License_Number});
        const verify=await DoctorPatientsSchema.deleteOne({DUID:Medical_License_Number})
        if(check&&verify)
        {
            return res.json({
                msg:"Delete Successfully"
            })
        }
        return res.json({
            msg:"Not Deleted"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in deleting detail"
        })
    }
})

route.post('/deletedetailnurse',Middleware,async(req,res)=>{
    try{
        const {Medical_License_Number}=req.body;
        const check=await NurseScheme.deleteOne({Medical_License_Number});
        const verify=await NursePatientsSchema.deleteOne({NUID:Medical_License_Number})
        if(check&&verify)
        {
            return res.json({
                msg:"Delete Successfully"
            })
        }
        return res.json({
            msg:"Not Deleted"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in deleting detail"
        })
    }
})

route.post('/postforscancenter',async(req,res)=>{
    try{
        const {Admin,username,DOB,Gender,Image,Email_Address,Current_Address,Qualifications,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience}=req.body;
        const currentdatetime=new Date();
        const currentdate=currentdatetime.toLocaleDateString()
        const currenttime=currentdatetime.toLocaleTimeString();
        const num=currentdatetime.getDay();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentday=daysOfWeek[num];
        const ScanCenter=new ScanCenterSchema({
            Admin,username,password:Medical_License_Number,Gender,DOB,Image,Email_Address,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,Date_Joined:currentdate,
            Time_Joined:currenttime,Day_Joined:currentday
        })
        ScanCenter.save();
        res.json({
            msg:"Details added successful"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in deleting detail"
        })
    }
})

route.post('/getallScancenter',async(req,res)=>{
    try{
        const {Admin}=req.body;
        const details=await ScanCenterSchema.find({Admin});
        if(details.length===0)
        {
            return res.json({
                msg:"No records Found"
            })
        }
        res.json({
            msg:"Details fetched",
            result:details
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in deleting detail"
        })
    }
})

route.post('/deletescancenter',async(req,res)=>{
    try{
        const {UID}=req.body;
        const deleted=await ScanCenterSchema.findOneAndDelete({Medical_License_Number:UID});
        if(deleted)
        {
            return res.json({
                msg:"Account deleted"
            })
        }
        else
        {
            return res.json({
                msg:"Account not found"
            })
        }
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in deleting detail"
        })
    }
})

module.exports=route