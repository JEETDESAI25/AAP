module.exports = (sequelize, Sequelize) => {
    return sequelize.define("feed_comment_like", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
             references: {
                model: "registration",
                key: "userId",
            }
        },
        feed_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "user_feed",
                key: "id",
            }
        },

        commentId: {
            type: Sequelize.BIGINT,
            allowNull: false,
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