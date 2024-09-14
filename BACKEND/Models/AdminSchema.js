const mongoose=require('mongoose')

const AdminScheme=new mongoose.Schema({
    adminuser:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports=mongoose.model('AdminUsers',AdminScheme);