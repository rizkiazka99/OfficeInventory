'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeesItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EmployeesItem.belongsTo(models.Employee);
      EmployeesItem.belongsTo(models.Item);
    }
  }
  EmployeesItem.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    EmployeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          message: 'EmployeeId cannot be null'
        },
        isInt: {
          message: 'EmployeeId has to be an integer'
        }
      }
    },
    ItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          message: 'ItemId name cannot be null'
        },
        isInt: {
          message: 'ItemId has to be an integer'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'EmployeesItem',
  });
  return EmployeesItem;
};