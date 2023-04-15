const { Category, Item, EmployeesItem, sequelize } = require('../models');

class CategoryController {
    static async getAllCategories(request, response) {
        try{
            let categories = await Category.findAll({
                order: [
                    ['id', 'asc']
                ],
                include: [ Item ]
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

    static async add(request, response) {
        try {
            const role = request.userData.role;
            const { name } = request.body;

            if (role !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only Admin(s) can perform this action'
                });
            } else {
                let result = await Category.create({ name });

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

    static async update(request, response) {
        try {
            const role = request.userData.role;
            const id = +request.params.id;
            const { name } = request.body;

            if (role !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only Admin(s) can perform this action'
                });
            } else {
                let result = await Category.update({ 
                    name 
                }, {
                    where: { id }
                });

                result[0] === 1 ? response.status(200).json({
                    status: true,
                    message: `Category with an ID of ${id} has been updated`
                }) : response.status(404).json({
                    status: false,
                    message: `Category with an ID of ${id} couldn't be updated or wasn't found`
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
            const role = request.userData.role;
            const id = +request.params.id;

            if (role !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only Admin(s) can perform this action'
                });
            } else {
                let result;
                let resultItems;
                let resultEmployeesItems;
                let itemIdArr = [];

                let items = await Item.findAll({
                    where: {
                        CategoryId: id
                    }
                });
                
                if (items.length !== 0) {
                    result = await Category.destroy({
                        where: {id}
                    });
    
                    resultItems = await Item.destroy({
                        where: {
                            CategoryId: id
                        }
                    });

                    items.forEach((item) => itemIdArr.push(item.id));

                    itemIdArr.forEach(async (id) => {
                        resultEmployeesItems = await EmployeesItem.destroy({
                            where: {
                                ItemId: id
                            }
                        });
                    });
                } else {
                    result = await Category.destroy({
                        where: {id}
                    });
                }

                result === 1 ? response.status(200).json({
                    status: true,
                    message: `Category with an ID of ${id} has been deleted`
                }) : response.status(404).json({
                    status: false,
                    message: `Category with an ID of ${id} couldn't be deleted or wasn't found`
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

    static async getById(request, response) {
        try {
            const id = +request.params.id;
            const role = request.userData.role;

            if (role !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only Admin(s) can perform this action'
                });
            } else {
                let result = await Category.findByPk(id, {
                    include: [ Item ]
                });

                result !== null ? response.status(200).json({
                    status: true,
                    data: result
                }) : response.status(404).json({
                    status: false,
                    message: `Category with an ID of ${id} wasn't found`
                });
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                error: err
            });
        }
    }

    static async getDetail(request, response) {
        try {
            const id = +request.params.id;

            let result = await Category.findByPk(id, {
                include: [ Item ]
            });

            result !== null ? response.status(200).json({
                status: true,
                data: result
            }) : response.status(404).json({
                status: false,
                message: `Category with an ID of ${id} wasn't found`
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                error: err
            });
        }
    }

    static async search(request, response) {
        try {
            const query = request.params.query.toLowerCase();

            let result = await Category.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + query + '%')
                }
            });

            result.length !== 0 ? response.status(200).json({
                status: true,
                data_count: result.length,
                data: result
            }) : response.status(404).json({
                status: false,
                message: `Couldn't find what you're looking for with the query of '${request.params.query}'`
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