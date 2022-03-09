module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("dope", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interface: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Todo;
};
