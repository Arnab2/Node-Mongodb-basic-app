import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema({
name: {
    type: String,
    require: true
},
email: {
    type: String,
    require: true
},
salary: {
    type: Number,
    default: 0
}
})

export const EmployeeModel = new model('employee',EmployeeSchema)