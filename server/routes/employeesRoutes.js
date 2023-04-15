const employeesRoutes = require("express").Router();
const { EmployeeController } = require('../controllers');
const multer = require("multer");
const upload = multer();
const { authentication } = require('../middlewares/auth.js')

employeesRoutes.get('/', EmployeeController.getAllEmployees);
employeesRoutes.post('/register', upload.single("image"), EmployeeController.register);
employeesRoutes.post('/login', EmployeeController.login);
employeesRoutes.put('/update/:id', authentication, upload.single("image"), EmployeeController.update);
employeesRoutes.delete('/delete', authentication, EmployeeController.delete);
employeesRoutes.get('/getById/:id', EmployeeController.getById);
employeesRoutes.get('/search/:query', EmployeeController.search);
employeesRoutes.get('/detail/:id', authentication, EmployeeController.getDetail);

module.exports = employeesRoutes;