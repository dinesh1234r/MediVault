const express=require('express')
const route=express.Router()
const bcrypt=require('bcrypt')
const AdminScheme=require('../Models/AdminSchema')
const jwt=require('jsonwebtoken');
const DoctorScheme=require('../Models/DoctorScheme');
const Middleware=require('../Middleware/middleware');
const NurseScheme = require('../Models/NurseScheme');
const ScanCenterSchema=require('../Models/ScanCenter')

route.post('/login',async(req,res)=>{
    try{
    const {adminuser,password}=req.body;
    const Admin=await AdminScheme.findOne({email:adminuser})
    if(!Admin)
    {
        return res.json({
            msg:"You are Not Authorized"
        })
    }
    const check=await bcrypt.compare(password, Admin.password)
    const token=jwt.sign({Email:Admin.email},'this is your secret key to login in bro')
    if(check)
    {
        return res.json({
            msg:"Login successful",
            token:token,
            ID:Admin._id,
            Image:Admin.logo,
            HospitalName:Admin.hospitalName
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

route.post('/getcount',async(req,res)=>{
    try{
        const {id}=req.body;
        const doctors=await DoctorScheme.find({AdminID:id});
        const nurses=await NurseScheme.find({AdminID:id});
        const scancenters=await ScanCenterSchema.find({AdminID:id});
        res.json({
            msg:"Count received",
            Doctors:doctors.length,
            Nurses:nurses.length,
            Scancenters:scancenters.length
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error Occurred"
        })
    }
})

route.post('/passwordchange',async(req,res)=>{
    try{
        const {oldPassword,newPassword,id}=req.body;
        const find=await AdminScheme.findById(id);
        if(find)
        {
            const pass=await bcrypt.compare(oldPassword,find.password);
            if(pass)
            {
                const hashpassword=await bcrypt.hash(newPassword,10);
                await AdminScheme.findByIdAndUpdate({_id:id},{password:hashpassword})
                return res.json({
                    msg:"PasswordChanged"
                })
            }
            else
            {
                return res.json({
                    msg:"Password Incorrect"
                })
            }
        }
        else
        {
            res.json({
                msg:"No User Found"
            })
        }
    }
    catch(err){
        res.json({
            msg:err
        })
    }
})

route.post('/postbyadmin',async(req,res)=>{
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
        AdminID:Admin,Doctor_name,Gender:gender,DOB,Image:photo,Email_Address,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,Contract_type,Date_Joined:currentdate,
        Time_Joined:currenttime,Day_Joined:currentday,Password:hashpassword
    })
    // const newdoctorpatients=new DoctorPatientsSchema({
    //     email:Email_Address,
    //     username:Doctor_name,
    //     password:hashpassword,
    //     DUID:Medical_License_Number,
    //     photo:photo
    // })
    // newdoctorpatients.save()
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
            AdminID:Admin,Doctor_name,Gender:gender,DOB,Image:photo,Email_Address,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,Date_Joined:currentdate,
            Time_Joined:currenttime,Day_Joined:currentday,Password:hashpassword
        })
        // const newnursepatients=new NursePatientsSchema({
        //     email:Email_Address,
        //     username:Doctor_name,
        //     password:hashpassword,
        //     NUID:Medical_License_Number,
        //     photo:photo
        // })
        // newnursepatients.save()
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
route.post('/getalldetailsofdoctor',async(req,res)=>{
    try{
        const {Admin} =req.body
        const details=await DoctorScheme.find({AdminID:Admin});
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

route.post('/getalldetailsofnurse',async(req,res)=>{
    try{
        const {Admin} =req.body
        const details=await NurseScheme.find({AdminID:Admin});
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

route.post('/deletedetail',async(req,res)=>{
    try{
        const {Medical_License_Number}=req.body;
        const check=await DoctorScheme.findByIdAndDelete(Medical_License_Number);
        if(check)
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

route.post('/deletedetailnurse',async(req,res)=>{
    try{
        const {Medical_License_Number}=req.body;
        const check=await NurseScheme.findByIdAndDelete(Medical_License_Number);
        if(check)
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
        const {Admin,Doctor_name,gender,DOB,Email_Address,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,photo}=req.body;
        const currentdatetime=new Date();
        const currentdate=currentdatetime.toLocaleDateString()
        const currenttime=currentdatetime.toLocaleTimeString();
        const num=currentdatetime.getDay();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentday=daysOfWeek[num];
        const hashpassword=await bcrypt.hash(Medical_License_Number,10);
        const nurse=new ScanCenterSchema({
            AdminID:Admin,username:Doctor_name,Password:hashpassword,Gender:gender,DOB,Image:photo,Email_Address,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,Date_Joined:currentdate,Time_Joined:currenttime,Day_Joined:currentday,Password:hashpassword
        })
        nurse.save()
        res.json({
            msg:"Details are saved successfully"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in addscan"
        })
    }
})

route.post('/getallScancenter',async(req,res)=>{
    try{
        const {Admin}=req.body;
        const details=await ScanCenterSchema.find({AdminID:Admin});
        if(details.length===0)
        {
            return res.json({
                msg:"No records Found"
            })
        }
        res.json({
            msg:"Details are shown below",
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
        const deleted=await ScanCenterSchema.findByIdAndDelete(UID);
        if(deleted)
        {
            return res.json({
                msg:"Delete Successfully"
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