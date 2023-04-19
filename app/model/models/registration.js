module.exports = (sequelize, Sequelize) => {
    return sequelize.define("registration", {
        userId: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        phoneNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nickName: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        gender: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        location: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        country: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        DOB: {
            type: Sequelize.DATE,

            // allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            // allowNull: false,
        },
        height: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        video: {
            type: Sequelize.STRING,
            // allowNull: true,
        },
        showMe: {
            type: Sequelize.ENUM('Man', 'Woman', 'Both'),
            // allowNull: true,
            defaultValue: 'Both'
        },
        education: {
            type: Sequelize.STRING,
            //  allowNull: false,
        },
        education_other: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        my_interest: {
            type: Sequelize.ENUM('Relationship', 'Just_Friend', 'Will_See'),
            allowNull: true,
        },
        user_package: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        duration: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        matchedId: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        smoking: {
            type: Sequelize.BIGINT,
            // allowNull: false,
        },
        drinking: {
            type: Sequelize.BIGINT,
            // allowNull: false,
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'user.png'
        },
        latitude: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        longtitude: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "user"
        },
        device_token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        active_status: {
            type: Sequelize.BIGINT,
        },
        isValid: {
            type: Sequelize.BIGINT,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    }, )

};