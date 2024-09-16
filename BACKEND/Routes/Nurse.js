const express=require('express');
const route=express.Router()
const DoctorPatientsSchema=require('../Models/DoctorPatientsSchema')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

route.post('/login',async(req,res)=>{
    try{

    }
    catch(err){
        res.json({
            msg:"Something wrong in our side(Nurse)"
        })
    }
})