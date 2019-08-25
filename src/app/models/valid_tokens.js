'use strict';
module.exports = (sequelize, DataTypes) => {
  const valid_tokens = sequelize.define('valid_tokens', {
    user_id: DataTypes.INTEGER,
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  valid_tokens.associate = function(models) {
    // associations can be defined here
  };
  
  return valid_tokens;
};