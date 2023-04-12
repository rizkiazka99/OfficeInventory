const route = require('express').Router();
const employeesRoutes = require('./employeesRoutes.js');
const itemsRoutes = require('./itemsRoutes.js');
const categoriesRoutes = require('./categoriesRoutes.js');
const employeesItemsRoutes = require('./employeesItemsRoutes.js');

route.get('/api', (request, response) => {
    response.status(200).json({
        message: "OfficeInventory API"
    });
});

route.use('/api/employees', employeesRoutes);
route.use('/api/items', itemsRoutes);
route.use('/api/categories', categoriesRoutes);
route.use('/api/employeesItems', employeesItemsRoutes);

module.exports = route;
