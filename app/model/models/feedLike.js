module.exports = (sequelize, Sequelize) => {
    return sequelize.define('feed_like', {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        feed_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "user_feed",
                key: "id",
            }
        },
        userId: {
            type: Sequelize.BIGINT,
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
        timestamps: false,
        freezeTableName: true
    })
}