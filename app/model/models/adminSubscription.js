module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "admin_subscription",
    {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
