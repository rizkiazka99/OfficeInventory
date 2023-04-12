const { Category } = require('../models');

class CategoryController {
    static async getAllCategories(request, response) {
        try{
            let categories = await Category.findAll({
                order: [
                    ['id', 'asc']
                ]
            });

            response.status(200).json({
                status: true,
                data_count: categories.length,
                data: categories
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                error: err
            });
        }
    }
}

module.exports = CategoryController;