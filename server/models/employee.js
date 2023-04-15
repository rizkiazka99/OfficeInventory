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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'E-mail address cannot be blank'
        },
        notNull: {
          message: 'E-mail address cannot be null'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'Username cannot be blank'
        },
        notNull: {
          message: 'Username cannot be null'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'Password cannot be blank'
        },
        notNull: {
          message: 'Password cannot be null'
        }
      }
    },
    image_name: DataTypes.STRING,
    image_type: DataTypes.STRING,
    image_data: DataTypes.BLOB('long'),
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'Role cannot be blank'
        },
        notNull: {
          message: 'Role cannot be null'
        }
      }
    }
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