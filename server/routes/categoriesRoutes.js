const categoriesRoutes = require('express').Router();
const { CategoryController } = require('../controllers');
const { authentication } = require('../middlewares/auth');

categoriesRoutes.get('/', CategoryController.getAllCategories);
categoriesRoutes.post('/add', authentication, CategoryController.add);
categoriesRoutes.put('/update/:id', authentication, CategoryController.update);
categoriesRoutes.delete('/delete/:id', authentication, CategoryController.delete);
categoriesRoutes.get('/getById/:id', authentication, CategoryController.getById);
categoriesRoutes.get('/detail/:id', CategoryController.getDetail);
categoriesRoutes.get('/search/:query', CategoryController.search);

module.exports = categoriesRoutes;