const employeesItemsRoutes = require("express").Router();
const { EmployeeItemController } = require('../controllers');
const { authentication } = require("../middlewares/auth");

employeesItemsRoutes.get('/', EmployeeItemController.getAllEmployeesItems);
employeesItemsRoutes.post('/add', authentication, EmployeeItemController.add);
employeesItemsRoutes.delete('/delete/:id', authentication, EmployeeItemController.delete);

module.exports = employeesItemsRoutes;