"use strict";

module.exports = function(sequelize, DataTypes) {
  var author = sequelize.define("author", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.post);
      }
    }
  });

  return author;
};
