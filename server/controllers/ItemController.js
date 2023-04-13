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

    static async add(request, response) {
        try {
            let result;
            const { name, stock, CategoryId } = request.body;
            const role = request.userData.role;

            if (role !== 'Admin') {
                response.status(401).json({
                    status: false,
                    message: 'Only Admin(s) can perform this action'
                });
            } else {
                if (request.file) {
                    const image_name = request.file.originalname;
                    const image_type = request.file.mimetype;
                    const image_data = request.file.buffer;
    
                    result = await Item.create({
                        name, stock, image_name, image_type, image_data, CategoryId
                    });
                } else {
                    result = await Item.create({
                        name, 
                        stock, 
                        image_name: null, 
                        image_type: null, 
                        image_data: null, 
                        CategoryId
                    });
                }
    
                response.status(200).json({
                    status: true,
                    data: result
                });
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                error: err
            })
        }
    }
}

module.exports = ItemController;

module.exports