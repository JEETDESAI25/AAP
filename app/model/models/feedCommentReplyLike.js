module.exports = (sequelize, Sequelize) => {
    return sequelize.define('feed_comment_reply_like', {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        reply_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
             references: {
                model: "registration",
                key: "userId",
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
}