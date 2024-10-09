const express=require('express')
const route=express.Router();
const PatientSchemas=require('../Models/PatientsSchema');
// const { findByIdAndUpdate } = require('../Models/NursePatientsScheme');
const currentDate = new Date();
const qs = require('qs');
const axios = require('axios');
const day = String(currentDate.getDate()).padStart(2, '0'); 
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
const year = currentDate.getFullYear();
const Middleware=require('../Middleware/middleware')
const simpleFormattedDate = `${day}/${month}/${year}`; 


route.post('/register',Middleware,async(req,res)=>{
    try{
        const {Name,Address,Aadhar,Phone_no,Photo,DOB}=req.body;
        const patient=new PatientSchemas({
            Name,Address,Phone_no,Aadhar,Photo,DOB,
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
        const patients=await PatientSchemas.find();
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

route.post('/entrypatient',Middleware,async(req,res)=>{
    try{
        const {_id,vitals,disease}=req.body;
        // const currentDate = new Date().toLocaleDateString();
        // const obj={Empty:empty}
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
        // const currentDate = new Date().toLocaleDateString();
        const result=await PatientSchemas.findOneAndUpdate({_id,
            'History.Date':simpleFormattedDate
        },
        {
            $set:{
                'History.$.preciption':preciption,
                'History.$.Doctor':Doctor
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