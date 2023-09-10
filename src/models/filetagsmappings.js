'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FileTagsMappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FileTagsMappings.init({
  }, {
    sequelize,
    modelName: 'FileTagsMappings',
    timestamps: true
  });
  return FileTagsMappings;
};