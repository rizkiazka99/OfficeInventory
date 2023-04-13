const itemsRoutes = require("express").Router();
const { ItemController } = require('../controllers');
const { authentication } = require("../middlewares/auth");

itemsRoutes.get('/', ItemController.getAllItems);
itemsRoutes.post('/add', authentication, ItemController.add);

module.exports = itemsRoutes;