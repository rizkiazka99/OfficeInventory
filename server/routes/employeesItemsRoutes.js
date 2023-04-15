const employeesItemsRoutes = require("express").Router();
const { EmployeeItemController } = require('../controllers');
const { authentication } = require("../middlewares/auth");

employeesItemsRoutes.get('/', EmployeeItemController.getAllEmployeesItems);
employeesItemsRoutes.post('/borrowItem', authentication, EmployeeItemController.add);
employeesItemsRoutes.delete('/returnItem', authentication, EmployeeItemController.delete);

module.exports = employeesItemsRoutes;