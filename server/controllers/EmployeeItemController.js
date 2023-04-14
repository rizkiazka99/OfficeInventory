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
            });
        }
    }

    static async add(request, response) {
        try {
            const { EmployeeId, ItemId } = request.body;

            let result = await EmployeesItem.create({
                EmployeeId, ItemId
            });

            response.status(201).json({
                status: true,
                data: result
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