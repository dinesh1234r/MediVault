const mongoose=require('mongoose')

const NursePatientsSchema=new mongoose.Schema({
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
    NUID:{
        type:String
    },
    patients:{
        type: Array
    }
})

module.exports=mongoose.model('NursePatientsSchema',NursePatientsSchema);