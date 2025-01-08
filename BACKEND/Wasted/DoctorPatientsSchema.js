const mongoose=require('mongoose')

const DoctorPatientsSchema=new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    username:{
        type:String,
    },
    password:{
        type: String,
        required: true
    },
    photo:{
        type:String,
    },
    DUID:{
        type:String
    },
    patients:{
        type: Array
    }
})

module.exports=mongoose.model('DoctorPatients',DoctorPatientsSchema);