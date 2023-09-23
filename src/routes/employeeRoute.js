import express from "express";
import { body } from "express-validator";

import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "../services/employeeServices.js";
import { validateRequest } from "../midllewares/validateRequest.js";

const router = express.Router();

const isNumber = (value) => {
  if (typeof value === "number") {
    return true;
  }
  return false;
};

// get all employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.send({ message: "Employees fetched successfully!", data: employees });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ message: e.message });
  }
});
// cerate an employee
router.post(
  "/create",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 characters long"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("salary")
      .custom(isNumber)
      .optional()
      .withMessage("salary must be a number"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const employee = await createEmployee(req.body);
      res
        .status(201)
        .send({ message: "Employee created successfully!", data: employee });
    } catch (e) {
      console.log(e.message);
      res.status(400).send({ message: e.message });
    }
  }
);

// update an employee
router.patch(
  "/employee",
  body("name")
    .trim()
    .isLength({ min: 3 })
    .optional()
    .withMessage("Name must be atleast 3 characters long"),
  body("email").isEmail().optional().withMessage("Email must be valid"),
  body("salary")
    .custom(isNumber)
    .optional()
    .withMessage("salary must be a number"),
  validateRequest,
  async (req, res) => {
    try {
      const updatedEmployee = await updateEmployee(req.query.email, req.body);

      res.send({
        message: "Employee details updated successfully!",
        data: updatedEmployee,
      });
    } catch (e) {
      console.log(e.message);
      res.status(400).send({ message: e.message });
    }
  }
);

// delete an employee
router.delete("/employee", async (req, res) => {
  try {
    const deletedEmployee = await deleteEmployee(req.query.email);

    res.send({
      message: "Employee deleted successfully!!",
      data: deletedEmployee,
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ message: e.message });
  }
});

export { router as employeeRouter };
