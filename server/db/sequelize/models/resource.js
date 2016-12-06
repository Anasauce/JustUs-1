'use strict';
module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define('Resource', {
    name: { type: DataTypes.STRING, allowNull: false },
    resource_type: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    address: DataTypes.STRING,
    website_url: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    created_by: DataTypes.STRING,
    description: DataTypes.STRING,
    service_region: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Resource;
};
