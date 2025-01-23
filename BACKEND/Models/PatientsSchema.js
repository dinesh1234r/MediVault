const mongoose=require('mongoose')

const PatientScheme=new mongoose.Schema({
    Name:String,
    Aadhar:String,
    Address:String,
    DOB:String,
    Email:String,
    Mobile_no:String,
    Photo:String,
    History:[{
        disease:String,
        notes:String,
        vitals:{type: Object, default: {}},
        Date:String,
        DoctorDetails:{type: Object, default: {}},
        report:{ type: Object, default: {} } ,
        preciption:[]
    }]
})

module.exports=mongoose.model('PatientsSchemas',PatientScheme);