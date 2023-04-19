module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_friend', {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        friend_userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
             references: {
                model: "registration",
                key: "userId",
            }
        },
        userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
             references: {
                model: "registration",
                key: "userId",
            }
        },
        status: {
            type: Sequelize.BIGINT,
            allowNull: false
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
}