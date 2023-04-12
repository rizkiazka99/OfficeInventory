const { EmployeesItem } = require('../models');

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
            })
        }
    }
}

module.exports = EmployeeItemController;