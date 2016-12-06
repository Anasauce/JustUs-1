'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    resource_id: { type: DataTypes.INTEGER, allowNull: false },
    response_time: { type: DataTypes.INTEGER, allowNull: false },
    use_again: { type: DataTypes.INTEGER, allowNull: false },
    helpful: { type: DataTypes.INTEGER, allowNull: false },
    comment: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Comment;
};
