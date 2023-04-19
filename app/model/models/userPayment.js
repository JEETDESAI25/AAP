module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_payment', {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
             references: {
                model: "registration",
                key: "userId",
            }
        },
        planId: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "admin_subscription",
                key: "id",
            }
        },
        paymentType: {
             type: Sequelize.ENUM('WorldPay','Stripe', 'Free','AirtelMoney','MpambaPay'),
            allowNull: false,
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        paymentFrom:{
             type: Sequelize.STRING,
            // allowNull: false,
        },
        receipt_telecom:{
             type: Sequelize.STRING,
           //  allowNull: false,
        },
        price:{
            type: Sequelize.BIGINT,
           // allowNull: false,
        },
        expiry_date:{
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue:'0000-00-00 00:00:00'
        },
        active_status:{
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 1
        },
        status:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        }

    }, {
        freezeTableName: true,
        timestamps: false
    })
}