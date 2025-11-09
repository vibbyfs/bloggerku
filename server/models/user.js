'use strict';
const { hash } = require('bcryptjs');
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'AuthorId' })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists"
      },
      validate: {
        notNull: {
          msg: "Username is required"
        },
        notEmpty: {
          msg: "username is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already exists"
      },
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Email format invalid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Passsword is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
        len: {
          args: [5],
          msg: "Password at least 5 characters"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Staff"
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  return User;
};