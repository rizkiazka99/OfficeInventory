const { Employee, EmployeesItem, sequelize } = require('../models');
const { decryptPassword, encryptPassword } = require('../helpers/bcrypt.js');
const { generateToken, verifyToken } = require('../helpers/jsonwebtoken.js');
const { Op } = require("sequelize");

class EmployeeController {
    static async getAllEmployees(request, response) {
        try {
            let employees = await Employee.findAll({
                order: [
                    ['id', 'asc']
                ]
            });

            employees.data.map((employee) => {
                if (employee.image_data !== null) {
                    const employee_image = employee.image_data.toString('base64');
                    employee['image_data'] = employee_image;
                    return employee;
                }
            });

            response.status(200).json({
                status: true,
                data_count: employees.length,
                data: employees
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                error: err
            });
        }
    }

    static async register(request, response) {
        try {
            let result;
            const { email, username, password, role } = request.body;

            let duplicateAccount = await Employee.findOne({
                where: { email }
            });

            if (duplicateAccount) {
                response.status(403).json({
                    status: false,
                    message: 'An account with this e-mail address already exists'
                })
            } else {
                if (request.file) {
                    const image_name = request.file.originalname;
                    const image_type = request.file.mimetype;
                    const image_data = request.file.buffer;
    
                    result = await Employee.create({
                        email,
                        username,
                        password,
                        image_name,
                        image_type,
                        image_data,
                        role
                    });
                } else {
                    result = await Employee.create({
                        email,
                        username,
                        password,
                        image_name: null,
                        image_type: null,
                        image_data: null,
                        role
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
            });
        }
    }

    static async login(request, response) {
        try {
            const { email, password } = request.body;

            let account = await Employee.findOne({
                where: { email }
            });

            if (account) {
                const isPasswordCorrect = decryptPassword(password, account.password);
                
                if (isPasswordCorrect) {
                    let access_token = generateToken(account);
                    let verify_token = verifyToken(access_token);

                    console.log(verify_token);
                    response.status(200).json({
                        status: true,
                        access_token: access_token
                    });
                } else {
                    response.status(403).json({
                        status: false,
                        message: "Invalid e-mail or password"
                    });
                }
            } else {
                response.status(404).json({
                    status: false,
                    message: "An account with this e-mail address wasn't found"
                })
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
            const id = +request.userData.id;
            let { email, username, password, image_name, image_type, image_data, role } = request.body;
            const new_password = encryptPassword(password);
            let result;

            if(request.file) {
                image_name = request.file.originalname;
                image_type = request.file.mimetype;
                image_data = request.file.buffer;

                result = await Employee.update({
                    email, 
                    username, 
                    password: new_password, 
                    image_name, 
                    image_type, 
                    image_data, 
                    role
                }, {
                    where: {id},
                });
            } else {
                result = await Employee.update({
                    email, 
                    username, 
                    password: new_password, 
                    image_name: null, 
                    image_type: null, 
                    image_data: null, 
                    role
                }, {
                    where: {id},
                });
            }

            result[0] === 1 ? response.status(200).json({
                status: true,
                message: `Account with an ID of ${id} has been updated`
            }) : response.status(404).json({
                status: false,
                message: `Account with an ID of ${id} couldn't be updated or wasn't found`
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                error: err
            });
        }
    }

    static async delete(request, response) {
        try {
            const id = +request.userData.id;

            let result;
            let resultJunction;
            let employeesItems = await EmployeesItem.findAll({
                where: {
                    EmployeeId: id
                }
            });

            if(employeesItems.length !== 0) {
                result = await Employee.destroy({
                    where: {id}
                });

                resultJunction = await EmployeesItem.destroy({
                    where: {
                        EmployeeId: id
                    }
                });

                console.log(`EmployeesItems with employeeId of ${id} has also been deleted`);
            } else {
                result = await Employee.destroy({
                    where: {id}
                });

                console.log(`EmployeesItems with employeeId of ${id} couldn't be found`);
            }
            
            result === 1 ? response.status(200).json({
                status: true,
                message: `Account with an ID of ${id} has been deleted`
            }) : response.status(404).json({
                status: false,
                message: `Account with an ID of ${id} couldn't be deleted or wasn't found`
            });
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

            let result = await Employee.findByPk(id);

            Object.keys(result).forEach((image_data, i) => {
                if (result[image_data] !== null) {
                    const employee_image = result[image_data].toString('base64');
                    result[image_data] = employee_image;
                }
            });

            result !== null ? response.status(200).json({
                status: true,
                data: result
            }) : response.status(404).json({
                status: false,
                message: `Employee with an ID of ${id} wasn't found`
            });
        } catch(err) {
             response.status(500).json({
                status: false,
                error: err
            }) 
        }
    }

    static async search(request, response) {
        const query = request.params.query.toLowerCase();

        try {
            let result = await Employee.findAll({
                where: {
                    [Op.or]: [
                        { username: sequelize.where(sequelize.fn('LOWER', sequelize.col('username')), 'LIKE', '%' + query + '%') },
                        { email: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')), 'LIKE', '%' + query + '%') }
                    ]          
                }
            });

            result.data.map((employee) => {
                if (employee.image_data !== null) {
                    const employee_image = employee.image_data.toString('base64');
                    employee['image_data'] = employee_image;
                    return employee;
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

module.exports = EmployeeController;