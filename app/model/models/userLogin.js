module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_login', {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
             references: {
                model: "registration",
                key: "userId",
            }
        },
        logged_in: {
            type: Sequelize.STRING,
            allowNull: false
        },
        logged_out: {
            type: Sequelize.STRING,
            allowNull: false
        },
        terms_conditions_flag: {
            type: Sequelize.INTEGER,
            defaultValue: 1
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