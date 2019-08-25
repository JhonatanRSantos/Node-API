'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    avatar: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    user.hasMany(models.valid_tokens, { onDelete: "CASCADE" });
  };
  return user;
};