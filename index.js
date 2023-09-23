import express from 'express'
import mongoose from 'mongoose';
import  {employeeRouter}  from './src/routes/employeeRoute.js';

const app = express()

app.use(express.json())
app.use(employeeRouter)

async function start(){
    try{
    await mongoose.connect('mongodb://0.0.0.0:27017/EmployeeDB')
    console.log('Connected to MongoDb');
    app.listen(3000,()=>{
        console.log('app running on port 3000');
    })
    }catch(e){
        console.log(e.message);
    }
}

start()