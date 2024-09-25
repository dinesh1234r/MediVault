const express=require('express')
const mongoose=require('mongoose')
const app=express();
const URI='mongodb+srv://root1:jocker22.dk@cluster01.watow3c.mongodb.net/';
const cors=require('cors');
const Admin=require('./Routes/admin')
const Doctor=require('./Routes/doctor')
const Nurse=require('./Routes/Nurse')

app.use(cors());

mongoose.connect(URI)
.then(()=>{
    console.log('Mongodb connected')
})
.catch((err)=>{
    console.log('error occured bro '+err);
})

app.use(express.json())

app.use('/admin',Admin)
app.use('/doctor',Doctor)
app.use('/nurse',Nurse)

app.listen(5000,()=>{
    console.log('Server is started');
})