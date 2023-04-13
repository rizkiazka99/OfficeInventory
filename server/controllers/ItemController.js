const { Item } = require('../models');

class ItemController {
    static async getAllItems(request, response) {
        try {
            let items = await Item.findAll({
                order: [
                    ['id', 'asc']
                ]
            });

            response.status(200).json({
                status: true,
                data_count: items.length,
                data: items
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                error: err
            });
        }
    }
}

module.exports = ItemController;

module.exports