module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_chat', {
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
            }
        },
        friend_userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "registration",
                key: "userId",
            }
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        seen_status: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
}