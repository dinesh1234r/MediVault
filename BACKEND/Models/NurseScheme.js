const mongoose=require('mongoose')

const NurseScheme=new mongoose.Schema({
    Admin:{
        type: String,
        // required: true
    },
    Doctor_name:{
        type: String,
        // required: true
    },
    DOB:{
        type:String
    },
    Gender:{
        type:String
    },
    Image:{
        type:String
    },
    Email_Address:{
        type: String,
        // required: true
    },
    Current_Address:{
        type: String,
        // required: true
    },
    Qualifications:{
        type: String,
        // required: true
    },
    Specialization:{
        type: String,
        // required: true
    },
    Medical_License_Number:{
        type: String,
        // required: true
    },
    Medical_Council_Registration_Number:{
        type: String,
        // required: true
    },
    Years_of_experience:{
        type: String,
        // required: true
    },
    Date_Joined:{
        type:String
    },
    Day_Joined:{
        type:String
    },
    Time_Joined:{
        type:String
    }
})

module.exports=mongoose.model('NurseScheme',NurseScheme);