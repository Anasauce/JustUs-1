'use strict';
module.exports = function(sequelize, DataTypes) {
  var Issue = sequelize.define('Issue', {
    resource_id: DataTypes.INTEGER,
    phone_wrong: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    location_wrong: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    type_wrong: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    is_active: {
      type: DataTypes.STRING,
      allowNull: false, 
      defaultValue: true
    },
    other: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Issue;
};
