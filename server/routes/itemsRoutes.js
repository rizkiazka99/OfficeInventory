const itemsRoutes = require("express").Router();
const { ItemController } = require('../controllers');
const { authentication } = require("../middlewares/auth");
const multer = require('multer');
const upload = multer();

itemsRoutes.get('/', ItemController.getAllItems);
itemsRoutes.post('/add', authentication, upload.single('image'), ItemController.add);
itemsRoutes.put('/update/:id', authentication, upload.single('image'), ItemController.update);
itemsRoutes.delete('/delete/:id', authentication, ItemController.delete);
itemsRoutes.get('/getById/:id', authentication, ItemController.getById);
itemsRoutes.get('/detail/:id', ItemController.getDetail);
itemsRoutes.get('/search/:query', ItemController.search);

module.exports = itemsRoutes;