'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category);
      Item.belongsToMany(models.Employee, { through: models.EmployeesItem });
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'Name cannot be blank'
        },
        notNull: {
          message: 'Name cannot be null'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          message: 'Stock cannot be null'
        },
        isInt: {
          message: 'Stock has to be an integer'
        }
      }
    },
    image_name: DataTypes.STRING,
    image_type: DataTypes.STRING,
    image_data: DataTypes.BLOB('long'),
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          message: 'CategoryId cannot be null'
        },
        isInt: {
          message: 'CategoryId has to be an integer'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};