const categoriesRoutes = require('express').Router();
const { CategoryController } = require('../controllers');

categoriesRoutes.get('/', CategoryController.getAllCategories);

module.exports = categoriesRoutes;