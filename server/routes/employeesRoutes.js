const employeesRoutes = require("express").Router();
const { EmployeeController } = require('../controllers');
const multer = require("multer");
const upload = multer();
const { authentication } = require('../middlewares/auth.js')

employeesRoutes.get('/', EmployeeController.getAllEmployees);
employeesRoutes.post('/register', upload.single("image"), EmployeeController.register);
employeesRoutes.post('/login', EmployeeController.login);
employeesRoutes.put('/update', authentication, upload.single("image"), EmployeeController.update);
employeesRoutes.delete('/delete', authentication, EmployeeController.delete)

module.exports = employeesRoutes;