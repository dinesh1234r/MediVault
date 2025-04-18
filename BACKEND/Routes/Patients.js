const express=require('express')
const route=express.Router();
const PatientSchemas=require('../Models/PatientsSchema');
const DoctorSchema=require('../Models/DoctorScheme')
const AdminSchema=require('../Models/AdminSchema')
const currentDate = new Date();
const qs = require('qs');
const axios = require('axios');
const day = String(currentDate.getDate()).padStart(2, '0'); 
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
const year = currentDate.getFullYear();
const Middleware=require('../Middleware/middleware')
const simpleFormattedDate = `${day}/${month}/${year}`; 
const GoogleVerifyToken=require('../Middleware/GoogleVerifyToken')
const jwt=require('jsonwebtoken');

route.post('/register',Middleware,async(req,res)=>{
    try{
        const {Name,Address,Aadhar,Mobile_no,Photo,DOB,Email}=req.body;
        const patient=new PatientSchemas({
            Name,Address,Mobile_no,Aadhar,Photo,DOB,Email,
            History:[]
        })
        await patient.save();
        res.json({
            msg:"Registration Successfully Done"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in Patient Registeration"
        })
    }
})

route.post('/login',Middleware,async(req,res)=>{
    try{
        const {image}=req.body;
        const patients=await PatientSchemas.find().select('-History');
        const apiKey = 'Sx_t147Y0IKXA1u8mpdAir9B9MXAQeHd';
        const apiSecret = 'e3DnUBVx54liPHCvy7yer0_dunF7K_-t';
        const url = 'https://api-us.faceplusplus.com/facepp/v3/compare';
        for(let patient of patients)
        {
            const formData = {
                api_key: apiKey,
                api_secret: apiSecret,
                image_url1: image,
                image_url2: patient.Photo,
              };

              const response = await axios.post(url, qs.stringify(formData), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              });
        
              const confidence = response.data.confidence;
              if (confidence > 80) {
                return res.json({ msg: 'Faces match!', result: patient });
              }
        }
        return res.json({
            msg:"No face found"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in patients login"
        })
    }
})

route.post('/loginforpatient',async(req,res)=>{
    try{
        const {image}=req.body;
        const patients=await PatientSchemas.find().select('-History');
        const apiKey = 'Sx_t147Y0IKXA1u8mpdAir9B9MXAQeHd';
        const apiSecret = 'e3DnUBVx54liPHCvy7yer0_dunF7K_-t';
        const url = 'https://api-us.faceplusplus.com/facepp/v3/compare';
        for(let patient of patients)
        {
            const formData = {
                api_key: apiKey,
                api_secret: apiSecret,
                image_url1: image,
                image_url2: patient.Photo,
              };

              const response = await axios.post(url, qs.stringify(formData), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              });
        
              const confidence = response.data.confidence;
              if (confidence > 80) {
                const token=jwt.sign({email:patient.Email},'this is your secret key to login in bro');
                return res.json({ msg: 'Faces match!', result: patient ,token});
              }
        }
        return res.json({
            msg:"No face found"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in patients login"
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
        const patients=await PatientSchemas.findOne({Email:email}).select('-History');
        if(patients)
        {
            const token=jwt.sign({email},'this is your secret key to login in bro');
            return res.json({ msg: 'Username Found', result: patients ,token });
        }
        return res.json({
            msg:"User Not Found"
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occurred in patients login"
        })
    }
})

route.post('/entrypatient',Middleware,async(req,res)=>{
    try{
        const {_id,vitals,disease}=req.body;
        const result=await PatientSchemas.findByIdAndUpdate(_id,{
            $push:{
                History:{
                    disease:disease,
                    notes:"",
                    vitals:vitals,
                    Date:simpleFormattedDate,
                    Doctor:"",
                    report:{ placeholder: "to be updated" },
                    preciption:[]
                }
            }
        })
        if(result)
        {
            res.json({
                msg:"Datas added successfully"
            })
        }
        else
        {
            res.json({
                msg:"Datas not saved"
            })
        }
    }
    catch(err)
    {
        res.json({
            msg:"Error Occurred in Patient Entry"
        })
    }
})

route.post('/notesadded',Middleware,async(req,res)=>{
    try{
        const {_id,notes}=req.body;
        // const currentDate = new Date().toLocaleDateString();
        const result=await PatientSchemas.findOneAndUpdate({_id,
            'History.Date':simpleFormattedDate
        },{
            $set:{
                'History.$.notes':notes
            }
        })
        if(result)
        {
            res.json({
                msg:"Notes added successfully"
            })
        }
        else
        {
            res.json({
                msg:"Notes not added"
            })
        }
    }
    catch(err)
    {
        res.json({
            msg:"Error Occurred in Notes Added"
        })
    }
})

route.post('/entryreport',Middleware,async(req,res)=>{
    try{
        const {_id}=req.body;
        // const currentDate = new Date().toLocaleDateString();
        const check=await PatientSchemas.findOne({_id})
        const result=check.History.find(item=>item.Date===simpleFormattedDate)
        if(result)
        {
            res.json({
                msg:"Entry Accepted",
                result:result
            })
        }
        else
        {
            res.json({
                msg:"Entry Not Accepted"
            })
        }
    }
    catch(err)
    {
        res.json({
            msg:"Error occured in Entry Report"
        })
    }
})
route.post('/updatereport',Middleware,async(req,res)=>{
    try{
        const {report,_id}=req.body;
        // const currentDate = new Date().toLocaleDateString();
        const result=await PatientSchemas.updateOne({_id,
            'History.Date':simpleFormattedDate
        },
        {
            $set:{
                'History.$.report':report
            }
        }
        )
        
        res.json({
            msg:"Report Added successfully"        
        })
    }
    catch(err)
    {
        res.json({
            msg:"Error occured in Update Report"
        })
    }
})

route.post('/updateprecription',Middleware,async(req,res)=>{
    try{
        const {_id,preciption,Doctor}=req.body;
        const doctor=await DoctorSchema.findById(Doctor);
        const hospital=await AdminSchema.findById(doctor.AdminID)
        
        const result=await PatientSchemas.findOneAndUpdate({_id,
            'History.Date':simpleFormattedDate
        },
        {
            $set:{
                'History.$.preciption':preciption,
                'History.$.DoctorDetails':{doctor,hospital}
            }
        }
        )
        
        if(result)
        {
            res.json({
                msg:"Precription added successfully"
            })
        }
        else
        {
            res.json({
                msg:"Precription not added"
            })
        }
    }
    catch(err)
    {
        res.json({
            msg:"Error Occurred in Update Precription"
        })
    }
})

route.post('/updateDisease',Middleware,async(req,res)=>{
    try{
        const {_id,disease}=req.body;
        const result=await PatientSchemas.findOneAndUpdate({_id,
            'History.Date':simpleFormattedDate
        },
        {
            $set:{
                'History.$.disease':disease,
            }
        }
        )
        if(result)
        {
            res.json({
                msg:"Disease Updated successfully"
            })
        }
        else
        {
            res.json({
                msg:"Patient doesn't make entry"
            })
        }
    }
    catch(err)
    {
        res.json({
            msg:"Error in Update Disease"
        })
    }
})

route.post('/history',Middleware,async(req,res)=>{
    try{
        const {_id}=req.body;
        const result=await PatientSchemas.findById({_id})
        if(result)
        {
            res.json({
                msg:"History received",
                result:result.History
            })
        }
        else
        {
            res.json({
                msg:"No History Found",
            })
        }
    }
    catch(err)
    {
        res.json({
            msg:"Error Occurred in History page"
        })
    }
})

module.exports=route