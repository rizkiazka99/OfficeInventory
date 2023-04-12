const employeesItemsRoutes = require("express").Router();
const { EmployeeItemController } = require('../controllers');

employeesItemsRoutes.get('/', EmployeeItemController.getAllEmployeesItems);

module.exports = employeesItemsRoutes;