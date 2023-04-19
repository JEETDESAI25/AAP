module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user_setting", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        notification: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        age: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        locationDistance: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        friend: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "registration",
                key: "userId",
            }
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
};