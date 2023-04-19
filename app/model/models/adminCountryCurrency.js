module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "admin_country_currency",
    {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      country_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currency_symbol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country_flag: {
        type: Sequelize.TEXT,
      },
      currency_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      default_currency_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
