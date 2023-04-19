module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_favorite', {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        fav_userId: {
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
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
    
}