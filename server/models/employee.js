'use strict';
const {
  Model
} = require('sequelize');
const { encryptPassword } = require('../helpers/bcrypt.js');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsToMany(models.Item, { through: models.EmployeesItem });
    }
  }
  Employee.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    image_name: DataTypes.STRING,
    image_type: DataTypes.STRING,
    image_data: DataTypes.BLOB('long'),
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (employee, options) => {
        employee.password = encryptPassword(employee.password);
      }
    },
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};