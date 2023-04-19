module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user_hobby", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        hobby: {
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
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })
}