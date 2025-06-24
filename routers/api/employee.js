const express = require('express');
const router = express.Router();
const data = {};
const employeeController = require("../../controllers/employeeController");

data.employees = require('../../model/data.json');

router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)

   
   
router.route('/:id')
    .get(employeeController.GetEmployeeById)

module.exports = router;