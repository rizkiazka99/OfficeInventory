const { Employee } = require('../models')

class EmployeeController {
    static async getAllEmployees(request, response) {
        try {
            let employees = await Employee.findAll({
                order: [
                    ['id', 'asc']
                ]
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
            })

            if (duplicateAccount) {
                response.status(403).json({
                    status: false,
                    error: 'An account with this e-mail address already exists'
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
    
                response.status(200).json({
                    status: true,
                    data: result
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

module.exports = EmployeeController;