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
                let borrowedItem = await Item.findAll({
                    where: {
                        id: ItemId
                    }
                });

                const { name, stock, image_null, image_type, image_data, CategoryId } = borrowedItem[0].dataValues;

                if (stock > 0) {
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
                } else {
                    response.status(403).json({
                        status: false,
                        message: 'Sorry, we\'ve run out of stock on this item, please wait until it\'s been restocked'
                    });
                }
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
            const { EmployeeId, ItemId } = request.body;

            let doesRelationExist = await EmployeesItem.findAll({
                where: {
                    [Op.and]: [
                        { EmployeeId: EmployeeId },
                        { ItemId: ItemId }
                    ]
                }
            });

            if (doesRelationExist.length === 0) {
                response.status(404).json({
                    status: false,
                    message: `Employee with an ID of ${EmployeeId} didn't borrow Item with an ID of ${ItemId}`
                });
            } else {
                let borrowedItem = await Item.findAll({
                    where: {
                        id: ItemId
                    }
                });
    
                const {name, stock, image_null, image_type, image_data, CategoryId} = borrowedItem[0];
    
                let updateStock = await Item.update({
                    name,
                    stock: stock + 1,
                    image_null,
                    image_type,
                    image_data,
                    CategoryId
                }, {
                    where: {
                        id: ItemId
                    }
                });
    
                let result = await EmployeesItem.destroy({
                    where: {
                        [Op.and]: [
                            { EmployeeId: EmployeeId },
                            { ItemId: ItemId }
                        ]
                    }
                });
    
                result === 1 ? response.status(200).json({
                    status: true,
                    message: `Item with an ID of ${ItemId} has been returned by Employee with an ID of ${EmployeeId}`
                }) : response.status(404).json({
                    status: false,
                    message: `Failed to return Item with an ID of ${ItemId}`
                });
            }
        } catch(err) {
            console.log(err)
            response.status(500).json({
                status: false,
                error: err
            });
        }
    }
}

module.exports = EmployeeItemController;