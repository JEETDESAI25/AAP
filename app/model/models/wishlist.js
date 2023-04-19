module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "wishlist",
    {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "registration",
          key: "userId",
        },
      },
      friend_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "registration",
          key: "userId",
        },
      },
      type: {
        type: Sequelize.ENUM("Left", "Right"),
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      status: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

