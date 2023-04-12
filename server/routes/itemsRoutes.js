const itemsRoutes = require("express").Router();
const { ItemController } = require('../controllers');

itemsRoutes.get('/', ItemController.getAllItems);

module.exports = itemsRoutes;