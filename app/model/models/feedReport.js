module.exports = (sequelize, Sequelize) => {
    return sequelize.define('feed_report', {
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
        message: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        status: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 2
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