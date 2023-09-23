import { EmployeeModel } from "../models/employee.js";

export const createEmployee = async (data) => {
  const employeeExists = await EmployeeModel.findOne({ email: data.email });
  if (employeeExists) throw new Error("Email is taken already");

  const employee = await EmployeeModel.create(data);
  return employee;
};

export const getAllEmployees = async () => {
  const employees = await EmployeeModel.find({});
  return employees;
};

export const deleteEmployee = async (email) => {
  const deletedEmployee = await EmployeeModel.findOneAndDelete({ email });

  if (deletedEmployee) return deletedEmployee;
  else throw new Error("employee not found");
};

export const updateEmployee = async (email, data) => {
  const updatedEmployee = await EmployeeModel.findOneAndUpdate(
    { email },
    data,
    { new: true }
  );

  if (updatedEmployee) return updatedEmployee;
  else throw new Error("Employee not found");
};
