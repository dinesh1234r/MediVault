const express=require('express')
const route=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt = require("bcrypt");
const Admin=require('../Models/AdminSchema')

route.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(req.body)
        if(email==="hospital.management@gov.in"&&password==="medivault")
        {
            const token=jwt.sign({email},'this is your secret key to login in bro')
            return res.json({
                msg:"Access Granted",
                token
            })
        }
        return res.json({
            msg:"Access Denied"
        })
    }
    catch(err)
    {
        res.json({
            mag:"Error Occurred in Server"
        })
    }
})

route.post("/addhospitals", async (req, res) => {
    try {
      const {
        hospitalName,
        ownerName,
        email,
        address,
        phone,
        timings,
        closedOn,
        logo,
        specialties,
        numberOfBeds,
      } = req.body;
  
      // Hash the default password "12345"
      const saltRounds = 10; // Higher number means more secure but slower hashing
      const hashedPassword = await bcrypt.hash("12345", saltRounds);
  
      const newHospital = new Admin({
        hospitalName,
        ownerName,
        email,
        password: hashedPassword,
        address,
        phone,
        timings,
        closedOn,
        logo,
        specialties,
        numberOfBeds,
      });
  
      await newHospital.save();
  
      res.json({
        message: "Hospital added successfully"
      });
    } catch (error) {
      res.json({ msg: error.message });
    }
  });


  route.get('/gethospitals', async (req, res) => {
    try {
      const hospitals = await Admin.find().select('-password'); 
      res.json({
        msg:"Hospital List are reterived",
        hospitals});
    } catch (error) {
      res.json({ msg: error.message }); // Handle any errors
    }
  });
module.exports=route