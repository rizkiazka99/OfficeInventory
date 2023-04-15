const { EmployeesItem, Item } = require('../models');
const { Op } = require('sequelize');

class EmployeeItemController {
    static async getAllEmployeesItems(request, response) {
        try {
            let employeesItems = await EmployeesItem.findAll({
                order: [
                    ['id', 'asc']
                ]
            });

            response.status(200).json({
                status: true,
                data_count: employeesItems.length,
                data: employeesItems
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
            const { EmployeeId, ItemId } = request.body;

            let duplicateRelation = await EmployeesItem.findAll({
                where: {
                    [Op.and]: [
                        { EmployeeId: EmployeeId },
                        { ItemId: ItemId }
                    ]
                }
            });

            if (duplicateRelation.length != 0) {
                response.status(403).json({
                    status: false,
                    message: 'Each employee can only borrow one of the same item'
                });
            } else {
                let borrowed_items = await Item.findAll({
                    where: {
                        id: ItemId
                    }
                });

                const { name, stock, image_null, image_type, image_data, CategoryId } = borrowed_items[0].dataValues;

                let updateStock = await Item.update({
                    name,
                    stock: stock - 1,
                    image_null,
                    image_type,
                    image_data,
                    CategoryId
                }, {
                    where: {
                        id: ItemId
                    }
                });

                let result = await EmployeesItem.create({
                    EmployeeId, ItemId
                });
    
                response.status(201).json({
                    status: true,
                    data: result
                });
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                error: err
            });
        }
    }

    static async delete(request, response) {
        try {
            const id = +request.params.id;

            let result = await EmployeesItem.destroy({
                where: {id}
            });

            result === 1 ? response.status(200).json({
                status: true,
                message: `EmployeesItems with an ID of ${id} has been deleted`
            }) : response.status(404).json({
                status: false,
                message: `EmployeesItems with an ID of ${id} couldn't be deleted or wasn't found`
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                error: err
            });
        }
    }
}

module.exports = EmployeeItemController;