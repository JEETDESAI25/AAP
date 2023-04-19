module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "payment_charges",
    {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      paymentType: {
        type: Sequelize.ENUM(
          "WorldPay",
          "Stripe",
          "Free",
          "AirtelMoney",
          "MpambaPay"
        ),
      },
      charges: {
        type: Sequelize.INTEGER,
      },
      active: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
