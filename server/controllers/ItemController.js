const { Item, Employee, Category, EmployeesItem, sequelize } = require('../models');

class ItemController {
    static async getAllItems(request, response) {
        try {
            let items = await Item.findAll({
                order: [
                    ['id', 'asc']
                ],
                include: [ Category ]
            });

            items.map((item) => {
                if (item.image_data !== null) {
                    const item_image = item.image_data.toString('base64');
                    item['image_data'] = item_image;
                    return item;
                }
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
                response.status(403).json({
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
    
                response.status(201).json({
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

    static async update(request, response) {
        try {
            const id = +request.params.id;
            const role = request.userData.role;
            let { name, stock, image_name, image_type, image_data, CategoryId } = request.body;

            if (role !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only Admin(s) can perform this action'
                });
            } else {
                let result;

                if (request.file) {
                    result = await Item.update({
                        name, stock, image_name, image_type, image_data, CategoryId
                    }, {
                        where: {id}
                    });
                } else {
                    result = await Item.update({
                        name, 
                        stock, 
                        image_name: null, 
                        image_type: null, 
                        image_data: null, 
                        CategoryId
                    }, {
                        where: {id}
                    });
                }

                result[0] === 1 ? response.status(200).json({
                    status: true,
                    message: `Item with an ID of ${id} has been updated`
                }) : response.status(404).json({
                    status: false,
                    message: `Item with an ID of ${id} couldn't be updated or wasn't found`
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
            const role = request.userData.role;

            if (role !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only Admin(s) can perform this action'
                });
            } else {
                let result;
                let resultJunction;
                let employeesItems = await EmployeesItem.findAll({
                    where: {
                        ItemId: id
                    }
                });

                if(employeesItems.length !== 0) {
                    result = await Item.destroy({
                        where: {id}
                    });

                    resultJunction = await EmployeesItem.destroy({
                        where: {
                            ItemeId: id
                        }
                    });

                    console.log(`EmployeesItems with employeeId of ${id} has also been deleted`);
                } else {
                    result = await Item.destroy({
                        where: {id}
                    });

                    console.log(`EmployeesItems with employeeId of ${id} couldn't be found`);
                }

                result === 1 ? response.status(200).json({
                    status: true,
                    message: `Item with an ID of ${id} has been deleted`
                }) : response.status(404).json({
                    status: false,
                    message: `Item with an ID of ${id} couldn't be deleted or wasn't found`
                });
            }
        } catch(err) {
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
                let tempArr = [];
                let result = await Item.findByPk(id);

                if (result !== null) {
                    tempArr.push(result);
                    tempArr.map((item) => {
                        if (item.image_data !== null) {
                            const item_image = item.image_data.toString('base64');
                            item['image_data'] = item_image;
                            return item;
                        }
                    });
                    result = tempArr[0];
                }

                result !== null ? response.status(200).json({
                    status: true,
                    data: result
                }) : response.status(404).json({
                    status: false,
                    message: `Item with an ID of ${id} wasn't found`
                });
            }
        } catch(err) {
            console.log(err);
            response.status(500).json({
                status: false,
                error: err
            })
        }
    }

    static async getDetail(request, response) {
        try {
            const id = +request.params.id;
            let result = {};
            let employees = [];

            let item = await Item.findAll({
                where: { id }
            });

            item.map((item) => {
                if (item.image_data !== null) {
                    const item_image = item.image_data.toString('base64');
                    item['image_data'] = item_image;
                    return item;
                }
            });

            let employeesItems = await EmployeesItem.findAll({
                where: {
                    ItemId: id
                }
            });

            if (employeesItems.length !== 0) {
                let employeesId = [];
                let employeesResult;

                employeesItems.forEach((employee) => {
                    employeesId.push(employee.dataValues.EmployeeId);
                });

                for(let i = 0; i < employeesId.length; i++) {
                    let id = employeesId[i];

                    employeesResult = await Employee.findAll({
                        where: {id}
                    });

                    employeesResult.map((employee) => {
                        if (employee.image_data !== null) {
                            const employee_image = employee.image_data.toString('base64');
                            employee['image_data'] = employee_image;
                            return employee;
                        }
                    });

                    if (employeesResult.length !== 0) {
                        employees.push(employeesResult[0].dataValues);
                    }
                }
            }

            result = {
                item: item[0],
                employees: employees,
            }

            result.item !== undefined ? response.status(200).json({
                status: true,
                data: result
            }) : response.status(404).json({
                status: false,
                message: `Item with an ID of ${id} wasn't found`
            });
        } catch(err) {
            console.log(err)
            response.status(500).json({
                status: false,
                error: err
            });
        }
    }

    static async search(request, response) {
        try {
            const query = request.params.query.toLowerCase();

            let result = await Item.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + query + '%')
                }
            });

            result.map((item) => {
                if (item.image_data !== null) {
                    const item_image = item.image_data.toString('base64');
                    item['image_data'] = item_image;
                    return item;
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

module.exports = ItemController;

module.exports