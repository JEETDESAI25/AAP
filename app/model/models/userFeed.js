
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_feed', {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hashtag: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
        },
        video: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.BIGINT,
             references: {
                model: "registration",
                key: "userId",
            }         
        },
        active_status: {
            type: Sequelize.BIGINT,
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
    },
        {
            timestamps: false, freezeTableName: true
        })
}