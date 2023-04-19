module.exports = (sequelize, Sequelize) => {
    return sequelize.define('feed_block', {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        feed_id: {
            type: Sequelize.BIGINT,
            references: {
                model: "user_feed",
                key: "id",
            },
            defaultValue: null
        },
        userId: {
            type: Sequelize.BIGINT,
             references: {
                model: "registration",
                key: "userId",
            },
            allowNull: false,
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