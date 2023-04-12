const employeesRoutes = require("express").Router();
const { EmployeeController } = require('../controllers');

employeesRoutes.get('/', EmployeeController.getAllEmployees);
employeesRoutes.post('/register', EmployeeController.register);

module.exports = employeesRoutes;