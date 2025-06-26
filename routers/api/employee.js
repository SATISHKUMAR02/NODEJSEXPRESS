const express = require('express');
const router = express.Router();
const data = {};
const employeeController = require("../../controllers/employeeController");
const verifyJwt = require('../../middlewares/verifyJwt');
data.employees = require('../../model/data.json');
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middlewares/verifyRoles')
router.route('/')
// so i we want all the methods to use jwt token for the request
// generally put it in server file since it follows water fall way of process 
    .get(verifyJwt,employeeController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User),employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)

   
   
router.route('/:id')
    .get(employeeController.GetEmployeeById)

module.exports = router;