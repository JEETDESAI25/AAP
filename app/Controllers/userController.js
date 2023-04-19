const bcrypt = require("bcrypt");
const db = require("../model/sequelize");
const userModel = db.registration;
const userNotification = db.userNotification;
const userSetting = db.userSetting;
const userHobby = db.userHobby;
const userPhoto = db.userPhotos;
const userFriend = db.userFriend;
const userFavorite = db.userFavorite;
const wishlist = db.wishlist;
const FeedReport = db.feedReport;
const FeedBlock = db.feedBlock;
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const logger = require("../loggers/logger");
const saltRounds = 10;
const homeModel = require("../queries/homeModel");
const shortid = require("shortid");
const { notification } = require("../services/notification");
const { mailSend } = require("../services/mail");
require("dotenv").config();
const { Op } = require("sequelize");
const moment = require("moment");
const { image_display_path } = require("../helpers/constant");
const { generateToken } = require("../helpers/auth");
let otp = shortid.generate();
logger.info(otp);
const { findUserSetting, getPagination, getPagingData } = require('../queries/homeModel');
const VoximplantApiClient = require("@voximplant/apiclient-nodejs").default;
const { feedReportFlag, feedReport} = require("../services/feed");


exports.userRegistration = async(req, res, next) => {
    try {
        const { phoneNo, password, fullName, country, device_token } =
        req.body;
        const email = req.body.email.toLowerCase()
        const checkMail = email == "" ? "noemail2.com" : email;
        const condition = { email: checkMail, phoneNo };
        const userData = await homeModel
            .findUser(["userId", "email", "phoneNo"], {
                [Op.or]: condition,
            })
            .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        if (userData.length) {
            const [dataValues] = userData;        
            if (parseInt(dataValues.phoneNo) === phoneNo || dataValues.email === email) {
                next(
                    new GeneralResponse(
                        "Mobile no or emailId is already registered with another account.",
                        [],
                        config.HTTP_ACCEPTED
                    )
                );
            }
        } else {
            const encryptedPassword = await bcrypt.hash(password, saltRounds);
            const values = {
                email,
                phoneNo,
                password: encryptedPassword,
                fullName,
                country,
                device_token,
            };
            const registeredData = await userModel
                .create(values)
                .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            if (registeredData) {
                const client = new VoximplantApiClient(
                  "./doc/aacf4f5d-318a-4bd6-9484-178355158657_private.json"
                );
                client.onReady = function () {
                  client.Users.addUser({
                    userName: `${phoneNo}`,
                    userDisplayName: `${fullName}`,
                    userPassword: `${email}`,
                    applicationId: "10472362",
                  });
                };
                await notification(
                    device_token,
                    "Registered successfully",
                    "Congratulation ! You are registered successfully."
                ).then(async() => {
                    const userNotificationData = {
                        user_id: registeredData.userId,
                        title: "Registered successfully",
                        description: "Congratulation ! You are registered successfully.",
                    };
                    userNotification
                        .create(userNotificationData)
                        .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
                }).catch((err) => next(new GeneralResponse("Device token is not valid !",err,config.HTTP_BAD_REQUEST)));
                const user_setting = {
                    notification: "1",
                    age: "1",
                    locationDistance: "1",
                    friend: "1",
                    userId: registeredData.userId,
                };
                userSetting
                    .create(user_setting)
                    .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            }
            next(new GeneralResponse("You are registered successfully.",registeredData.userId, config.HTTP_CREATED,1));
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to user registration"));
    }
};
exports.updateProfileRegister = async(req, res, next) => {
    try {
        const { hobby } = req.body
        const updateData = await userModel.update(req.body, {
                where: { userId: req.params.id },
            })
            .catch((err) =>next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        const [dataValues] = updateData;
        if (dataValues === 1) {
            if (typeof hobby !== "undefined" || hobby !== null) {
               const values= hobby.map((value) => {
                   return {    
                       hobby : value,
                       userId : req.params.id
                    }
               });
                    const hobbyData = await userHobby.bulkCreate(values);
                    if (!hobbyData) {
                        next(
                            new GeneralResponse(
                                "Data not found",
                                [],
                                config.HTTP_NOT_FOUND
                            )
                        );
                    }
            }
            if(req.files){    
                const photosArray = req.files.map((fileData) => {
                        return {
                           photo: fileData.filename,
                           userId: req.params.id,
                        }
                    })
                const userPhotoResponse = await userPhoto.bulkCreate(photosArray)
                    .catch((err) => next(new GeneralError(err)));     
                if (!userPhotoResponse) {
                    next(
                        new GeneralResponse("Data not found.",[],config.HTTP_NOT_FOUND)
                    );
                }
            }
            next(
                new GeneralResponse(
                    "Your profile is updated successfully.",
                    undefined,
                    config.HTTP_ACCEPTED,
                    1
                )
            );
        } else {
            next(
                new GeneralResponse("Your profile is not updated.",[],config.HTTP_NOT_FOUND)
            );
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to user updated"));
    }
};

exports.updateProfile = async(req, res, next) => {
    try {
        const data = req.body;
        if (req.file) {
            data.photo = req.file.filename;
        }
        const updateProfileData = await userModel.update(data, {
                where: { userId: req.params.id },
            })
            .catch((err) =>next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        const [dataValues] = updateProfileData
        if (dataValues === 1) {
            next(
                new GeneralResponse("Your profile is updated successfully.",updateProfileData,config.HTTP_ACCEPTED,1)
            );
        } else {
            next(
                new GeneralResponse("Your profile is not updated.",[],config.HTTP_NOT_FOUND)
            );
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to user update"));
    }
};

exports.userLogin = async(req, res, next) => {
    try {
        const { password, phoneNo } = req.body;
        const email = req.body.email.toLowerCase();
        const condition = { email : email ? email : '', phoneNo : phoneNo ? phoneNo : null };
        const response = await homeModel
            .findUser(["userId", "showMe", "password"], {
                [Op.or]: condition,
            })
            .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        if (response.length > 0) {
            const [dataValues] = response;
            const comparison = await bcrypt.compare(password, dataValues.password);
            if (comparison) {
                let token = generateToken(dataValues.userId);
                await next(
                    new GeneralResponse(
                        "You are login successfully.",
                        {
                            userId: dataValues.userId,
                            showMe: dataValues.showMe,
                            token
                        },
                        config.HTTP_SUCCESS,
                        1
                    )
                );
            } else {
                next(
                    new GeneralResponse("Credential does not match.",[],config.HTTP_NOT_FOUND)
                );
            }
        } else {
            next(
                new GeneralResponse("Data not found.",[],config.HTTP_NOT_FOUND)
            );
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to user login"));
    }
};

exports.forgotPassword = async(req, res, next) => {
    try {
        const { email } = req.body;
        const userData = await homeModel
            .findUser(["userId", "email"], { email })
            .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        if (userData.length > 0) {
            const otpUpdate = await userModel.update({ matchedId: otp }, { where: { email } });
            if (otpUpdate) {
                mailSend(
                        email,
                        "Forgot password",
                        'To reset your password enter this verification code : "' + otp + '"'
                    )
                    .then(async() => {
                        next(new GeneralResponse("Email has been sent.",otp, config.HTTP_SUCCESS,1));
                    })
                    .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            } else {
                next(
                    new GeneralResponse("Data not updated.",[],config.HTTP_NOT_FOUND)
                );
            }
        } else {
            next(
                new GeneralResponse("Data not found.",[],config.HTTP_NOT_FOUND)
            );
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to send email"));
    }
};

exports.resetPassword = async(req, res, next) => {
    try {
        const { newPassword, matchedId } = req.body;
        const userData = await homeModel
            .findUser(["matchedId"], { matchedId })
            .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        if (userData.length > 0) {
            const encryptedPassword = await bcrypt.hash(newPassword, saltRounds);
            const updatePassword = await userModel
                .update({ password: encryptedPassword }, { where: { matchedId } })
                .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            if (updatePassword) {
                next(
                    new GeneralResponse(
                        "Your password is updated successfully.",
                        undefined,
                        config.HTTP_ACCEPTED,
                        1
                    )
                );
            } else {
                next(
                    new GeneralResponse("Your password is not updated.",[],config.HTTP_NOT_FOUND)
                );
            }
        } else {
            next(
                new GeneralResponse("Data not found.",[],config.HTTP_NOT_FOUND)
            );
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to update"));
    }
};

exports.userSocialAcc = async(req, res, next) => {
    try {
        const email = req.params.email;
        const findUsers = await userModel
            .findAll({ where: { email: email } })
            .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        if (findUsers.length === 0) {
            next(new GeneralResponse("Data not found.",[], config.HTTP_NOT_FOUND));
        } else {
            const [dataValues] = findUsers;
            next(new GeneralResponse("You are login successfully.",dataValues.userId, config.HTTP_SUCCESS,1));
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to user socialAcc"));
    }
};

exports.changePassword = async(req, res, next) => {
    try {
        const userId = req.params.userId;

        const updatePassword = { password: await bcrypt.hash(req.body.newPassword, saltRounds) };

        const changePassword = await userModel.update(updatePassword, { where: { userId } })
            .catch((err) =>next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)))
        const [dataValues] = changePassword;
        if (dataValues === 1) {
            next(
                new GeneralResponse(
                    "Your password is updated successfully.",
                    undefined,
                    config.HTTP_ACCEPTED,
                    1
                )
            );
        } else {
            next(
                new GeneralResponse("Please Try Again Later.",[], config.HTTP_NOT_FOUND)
            );
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to update"));
    }
};

exports.getUserProfile = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const findUsers = await userModel.findAll({
                attributes: ['fullName', 'country', 'video', 'nickName', 'email', 'phoneNo', 'location', 'description', 'gender', [db.sequelize.fn('date_format', db.sequelize.col('DOB'), '%Y-%m-%d'), 'DOB'], 'education', 'height', 'photo', 'showMe', 'education_other', 'smoking', 'drinking', 'my_interest'],
                where: { userId: userId }
            })
            .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        if (findUsers.length > 0) {
            findUsers.map(async(listUsers) => {
                listUsers.photo = image_display_path + listUsers.photo;
            });
            let listUserResponse = { 'user_profile': findUsers };
            const user_Photo = await userPhoto.findAll({
                    attributes: ['photo', 'id'],
                    where: { userId: userId },
                })
                .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            user_Photo.map(async(listUsers) => {
                listUsers.photo = image_display_path + listUsers.photo;
            });
            listUserResponse.user_photos = user_Photo;
            const user_hobby = await userHobby.findAll({
                where: { userId: userId },
            });
            listUserResponse.user_hobby = user_hobby;

            const findUserFriend = await userFriend.findAll({
                attributes: ["friend_userId"],
                where: { userId: userId },
                include: [{
                    model: userModel,
                    attributes: ["photo"],
                    required: true,
                }, ],
            });
            const userFriendResult = [];
            findUserFriend.map((listUsers) => {
                userFriendResult.push({
                    friend_userId: listUsers.friend_userId,
                    photo: image_display_path + listUsers.registration.photo,
                });
            });
            listUserResponse.user_friend = userFriendResult;
            next(new GeneralResponse("User profile successfully.",listUserResponse, config.HTTP_SUCCESS,1));
        } else {
            next(
                new GeneralResponse("Data not found.",[], config.HTTP_NOT_FOUND)
            );
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to user profile"));
    }
};

exports.userProfileAll = async(req, res, next) => {
    try {
        const { showMe, userId } = req.body;
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        if (showMe === "Man") {
            improve = "Male";
        } else if (showMe === "Woman") {
            improve = "Female";
        } else {
            improve = "";
        }
        const registrationUser = await userModel.findAndCountAll({
                attributes: [
                    "userId",
                    "fullName",
                    "active_status",
                    [db.sequelize.fn('date_format', db.sequelize.col('DOB'), '%Y-%m-%d'), 'DOB'],
                    "gender",
                    "country",
                    "location",
                    "latitude",
                    "longtitude",
                    "photo",
                    "timestamp",
                ],
                where: {
                    [Op.and]: {
                        userId: {
                            [Op.ne]: userId,
                        },
                        gender: improve,
                    },
                },
                limit,
                offset,
                order: [
                    ["timestamp", "DESC"]
                ]
            })
            .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));

        if (registrationUser.rows.length === 0) {
            next(
                new GeneralResponse("Data not found",[], config.HTTP_NOT_FOUND)
            );
        } else {
            const wishListUserData = await wishlist.findAll({
              attributes: ["friend_id", "type"],
              where: { user_id: userId },
            });

            registrationUser.rows = await Promise.all(
                registrationUser.rows.map(async(registrationUsers) => {
                    let age;
                    if(registrationUsers.dataValues.DOB !== 0000-00-00 || registrationUsers.dataValues.DOB !== 'Invalid Date'){
                     age = moment().diff(moment(registrationUsers.dataValues.DOB, "YYYY-MM-DD"), 'years');
                    }else{
                     age = "";
                    }
                    registrationUsers.dataValues.age = age;
                    const wishlist = wishListUserData.find(wishlistUser => wishlistUser.friend_id === registrationUsers.userId);

                    const userSetting = await findUserSetting(["age", "locationDistance"], {
                        userId: registrationUsers.dataValues.userId
                    });

                    const [dataValues] = userSetting;
                    if (userSetting.length > 0) {
                        registrationUsers.dataValues.ageFlag = dataValues.age;
                        registrationUsers.dataValues.locationFlag = dataValues.locationDistance;
                    }
                    let sql_distance = (having = "");

                    if (
                        registrationUsers.dataValues.latitude !== null &&
                        registrationUsers.dataValues.latitude !== ""
                    ) {
                        sql_distance =
                            ",(((acos(sin((" +
                            registrationUsers.dataValues.latitude +
                            "*pi()/180)) * sin((`latitude`*pi()/180))+cos((" +
                            registrationUsers.dataValues.latitude +
                            "*pi()/180)) * cos((`latitude`*pi()/180)) * cos(((" +
                            registrationUsers.dataValues.longtitude +
                            "-`longtitude`)*pi()/180))))*180/pi())*60*1.1515*1.609344) as distance";
                        
                        order_by = "ORDER BY distance ASC ";
                    } else {
                        order_by = "ORDER BY p.userId DESC ";
                    }
                    new Promise(async(res) => {

                        const registrationUser1 = await db.sequelize.query(
                            "SELECT latitude,longtitude,location" +
                            sql_distance +
                            " from registration as p where userId='" +
                            userId +
                            "' " +
                            order_by +
                            " "
                        );

                        const [TextRow] = registrationUser1;
                        if (TextRow.distance !== undefined && TextRow.distance !== null) {
                            registrationUsers.dataValues.distanceInMiles = Math.round(
                                0.6214 * TextRow.distance
                            );
                        } else {
                            registrationUsers.dataValues.distanceInMiles = null;
                        }
                        res(TextRow);
                    });

                    const favoriteData = await userFavorite.findAll({
                        where: {
                            fav_userId: registrationUsers.userId
                        }
                    }).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));

                    let favFlag;
                    new Promise(async (resolve) => {
                        if (favoriteData.length > 0) {
                            favFlag = 1;
                        } else {
                            favFlag = 0;
                        }
                        resolve(favFlag);
                    });

                    const friendData = await userFriend.findAll({
                        attributes: ['status'],
                        where: {  
                            friend_userId : registrationUsers.userId,
                            userId:userId
                        }
                    }).catch((err) =>next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));

                    let status;
                    new Promise(async (resolve) => {
                        if (friendData.length > 0) {
                            const [values] = friendData
                            status = values.status;
                        } else {
                            status = 3;
                        }
                        resolve(status);
                    });


                    registrationUsers.dataValues.fav_flag = favFlag;
                    registrationUsers.dataValues.friendFlag =  status;

                        return { 
                            userId: registrationUsers.dataValues.userId,
                            fullName: registrationUsers.dataValues.fullName,
                            active_status: registrationUsers.dataValues.active_status,
                            DOB: registrationUsers.dataValues.DOB,
                            gender: registrationUsers.dataValues.gender,
                            country: registrationUsers.dataValues.country,
                            location: registrationUsers.dataValues.location,
                            latitude: registrationUsers.dataValues.latitude,
                            longtitude: registrationUsers.dataValues.longtitude,
                            photo: image_display_path + registrationUsers.dataValues.photo,
                            timestamp: registrationUsers.dataValues.timestamp,
                            ageFlag: registrationUsers.dataValues.ageFlag,
                            locationFlag: registrationUsers.dataValues.locationFlag,
                            distanceInMiles: registrationUsers.dataValues.distanceInMiles,
                            age: registrationUsers.dataValues.age,
                            type: wishlist ? wishlist.type :'',
                            fav_flag: registrationUsers.dataValues.fav_flag,
                            friendFlag : registrationUsers.dataValues.friendFlag,
                        };
                })
            );
          
            const result = getPagingData(registrationUser);
            next(new GeneralResponse("Get all user profile.",result,config.HTTP_SUCCESS,1));
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to user profile"));
    }
}

exports.newUserProfile = async(req, res, next) => {
    try {
        const { showMe, userId, flag } = req.body;
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        if (flag != undefined) {
            const condition = {
                userId: {
                    [Op.ne]: userId,
                },
                active_status: 0,
                showMe: flag,
            };
            const viewUserProfile = await homeModel
                .findAndCountData(
                    ["photo", "userId", "fullName", "timestamp", "active_status"],
                    condition,limit,offset,["timestamp", "DESC"]
                )
                .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
                const wishListUserData = await wishlist.findAll({
                  attributes: ["friend_id", "type"],
                  where: { user_id: userId },
                });
                if (viewUserProfile.rows.length > 0) {
                    viewUserProfile.rows.map(async(listUser) => { 
                        const wishlist = wishListUserData.find(
                            (wishlistUser) => 
                            wishlistUser.friend_id === listUser.userId
                            );
                            listUser.photo = image_display_path + listUser.photo,
                            listUser.dataValues.type =  wishlist ? wishlist.type : ''
                        });
                const response = getPagingData(viewUserProfile)
                next(new GeneralResponse("New user profile successfully.",response, config.SUCCESS,1));
            } else {
                next(
                    new GeneralResponse("Data not found.", [], config.HTTP_NOT_FOUND)
                );
            }
        } else {
            let improve;
            if (showMe === "Man") {
                improve = "Male";
            } else if (showMe === "Woman") {
                improve = "Female";
            } else {
                improve = "";
            }
            const findUserData = await homeModel
                .findAndCountData(
                    ["photo", "gender", "userId", "fullName", "timestamp"], { userId: { [Op.ne]: userId }, gender: improve },limit,offset, ["timestamp", "DESC"]
                )
                .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            if (findUserData) {
                const wishListUserData = await wishlist.findAll({
                    attributes: ["friend_id", "type"],
                    where: { user_id: userId },
                  });
                findUserData.rows = await Promise.all(
                    findUserData.rows.map(async(userData) => {
                        const wishlist = wishListUserData.find(
                            (wishlistUser) => 
                            wishlistUser.friend_id === listUser.userId
                            );
                        const userFavoriteData = await userFavorite.findAll({ where: { fav_userId: userData.userId, userId: userId } });
                        let favFlag;
                        if (userFavoriteData.length>0) {
                            favFlag = 1;
                        } else {
                            favFlag = 0;
                        }
                        return {
                            photo: image_display_path + userData.photo,
                            gender: userData.gender,
                            userId: userData.userId,
                            fullName: userData.fullName,
                            timestamp: userData.timestamp,
                            fav_flag: favFlag,
                            type : wishlist ? wishlist.type : ''
                        };
                    })
                );
                const newUserProfileResponse = getPagingData(findUserData)
                next(new GeneralResponse("Get new profile successfully.",newUserProfileResponse, config.HTTP_SUCCESS,1));
            } else {
                next(
                    new GeneralResponse("Data not found.",[], config.HTTP_NOT_FOUND)
                );
            }
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to view profile"));
    }
};

exports.addProfileImages = async(req, res, next) => {
    try {
        const data = req.body;
        if (!req.file) {
            next(new GeneralResponse("Image is required", [], config.HTTP_BAD_REQUEST))
        } else {
            data.photo = req.file.filename;
            await userPhoto.create(data).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            next(new GeneralResponse("Your photo is added successfully.",undefined, config.HTTP_ACCEPTED,1));
        }
    } catch (err) {
        logger.error(err);
        next(new GeneralError("Failed to update", undefined, config.HTTP_ACCEPTED));
    }
};

exports.deleteProfileImages = async(req, res, next) => {
    try {
        const findId = await userPhoto.findAll({ where: { id: req.params.id } })
        if (findId.length > 0) {
            await userPhoto
                .destroy({ where: { id: req.params.id } })
                .catch((err) =>next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            next(
                new GeneralResponse("Your photo is deleted successfully.",undefined ,config.HTTP_SUCCESS,1)
            );
        } else {
            next(new GeneralResponse("ID not found.",[],config.HTTP_BAD_REQUEST));
        }

    } catch (err) {
        logger.error(err);
        next(new GeneralError("Failed to delete", undefined, config.HTTP_SERVER_ERROR));
    }
};

exports.addSingleHobby = async(req, res, next) => {
    try {
        await userHobby.create(req.body).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        next(
            new GeneralResponse("Your hobby is added successfully.",undefined,config.HTTP_CREATED,1)
        );
    } catch (err) {
        logger.error(err);
        next(new GeneralError("Failed to add hobby", undefined, config.HTTP_SERVER_ERROR));
    }
};

exports.discoverVideo = async(req, res, next) => {
    try {
        const { userId } = req.params;
        const video = await userModel
            .findAll({ attributes: ["video"] }, { where: { userId } })
            .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        const [dataValues] = video;
        if (video.length > 0 && dataValues.video != null) {
            if (dataValues.video === 'undefined' || dataValues.video === null) {
                dataValues.video = null;
            } else {
                dataValues.video = image_display_path + dataValues.video;
            }
            next(new GeneralResponse("Discover video successfully.",dataValues, config.HTTP_SUCCESS,1));
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to discover video"));
    }
}

exports.deleteSingleHobby = async(req, res, next) => {
    try {
        const deleteSingleHobbyResponse = await userHobby
            .destroy({
                where: { id: req.params.id },
            })
            .catch((err) =>next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        if (deleteSingleHobbyResponse) {
            next(
                new GeneralResponse(
                    "User hobby deleted successfully.",
                    undefined,
                    config.HTTP_SUCCESS,
                    1
                )
            );
        } else {
            next(
                new GeneralResponse("ID not found.",[], config.HTTP_NOT_FOUND)
            );
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to delete"));
    }
};

exports.updateProfileImages = async(req, res, next) => {
    try {
        const { userId, id } = req.params;
        if (!req.file) {
            next(new GeneralError("Image is required", config.HTTP_NOT_FOUND))
        } else {
            const updateData = await userPhoto
                .update({ photo: req.file.filename }, { where: { userId, id } })
                .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            const [dataValues] = updateData
            if (dataValues) {
                 next(
                    new GeneralResponse("Your photo is updated successfully.",dataValues, config.HTTP_ACCEPTED,1)
                );
            } else {
                 next(
                    new GeneralResponse("Your photo is not updated.", [], config.HTTP_NOT_FOUND)
                );
            }
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("Failed to update"));
    }
}

exports.updateSingleHobby = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { hobby } = req.body;
        const usersHobby = await userHobby.update({ hobby: hobby }, {
            where: { id }
        }).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        const [dataValues] = usersHobby
        if (dataValues)
            next(
                new GeneralResponse(
                    "Your hobby is updated successfully.",
                    usersHobby,
                    config.HTTP_ACCEPTED,
                    1
                )
            );
        else {
            next(
                new GeneralResponse(
                    "Your hobby is not updated.",
                    [],
                    config.HTTP_NOT_FOUND
                )
            );
        }
    } catch (err) {
        logger.error(err);
        next(new GeneralError(
            "Failed to update"
        ))
    }
}

exports.userProfile = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const friend_userId = req.params.friend_userId;
        const findUser = await userModel.findAll({
            attributes: ['fullName', 'email', 'userId','phoneNo', 'location', 'description', 'gender', 'DOB', 'education', 'height', 'photo'],
            where: { userId: friend_userId }
        }).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
        if (findUser) {
            findUser.map(async userInformation => {
                userInformation.dataValues.DOB = moment(userInformation.dataValues.DOB).format("DD MMM YYYY").toUpperCase();
                userInformation.dataValues.photo = image_display_path + userInformation.dataValues.photo;
            });
            const userProfileData = findUser;
            const friendData = await userFriend.findAll({
                attributes: ['id', 'friend_userId', 'userId', 'status', 'timestamp'],
                where: {
                    userId: userId,
                    friend_userId: friend_userId
                }
            }).catch((err) =>next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            let status;
            new Promise(async (resolve, reject) => {
                if (friendData.length > 0) {
                    const [values] = friendData
                    status = values.status;
                } else {
                    status = 3;
                }
                resolve(status);
            });
            const [value] = findUser
          value.dataValues.friendFlag = status;
            const findFriend = await userFriend.findAll({
                attributes: ['id', 'friend_userId', 'userId', 'status', 'timestamp'],
                where: {
                    userId: friend_userId,
                    friend_userId: userId
                }
            }).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            if (findFriend.length > 0) {
                const[dataValues]=findFriend
                if (dataValues.status === 0) {   
                    const [values] = findUser
                    values.dataValues.friendFlag = 4;
                }
            }       
            const favoriteData = await userFavorite.findAll({
                attributes: ['id', 'fav_userId', 'userId', 'timestamp'],
                where: {
                    userId,
                    fav_userId: friend_userId
                }
            }).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            let favFlag;
            new Promise(async (resolve, reject) => {
                if (favoriteData.length > 0) {
                    favFlag = 1;
                } else {
                    favFlag = 0;
                }
                resolve(favFlag);
            });
            value.dataValues.fav_flag = favFlag;
            const userPhotos = await userPhoto.findAll({
                attributes: ['photo'],
                where: { userId : friend_userId }
            }).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            if (userPhotos) {
                userPhotos.map( photos => {
                    photos.photo = image_display_path + photos.photo;
                })
            }
            const hobbyData = await userHobby.findAll({
                where: { userId : friend_userId }
            }).catch((err) =>next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            const userStatus = await userModel.findAll({
                attributes: ['active_status'],
                where: { userId : friend_userId }
            }).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            const friendUserData = await userFriend.findAll({
                attributes: ['friend_userId'],
                where: { userId : friend_userId },
                include: [{
                    model: userModel,
                    attributes: ['photo'],
                    required: true
                }]
            }).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            const friendList = friendUserData.map(friendUserList => {   
                return{
                    friend_userId: friendUserList.friend_userId,
                    photo: image_display_path+friendUserList.registration.photo
                }
            })
            const blockFriendData = await userFriend.findAll({
                where: {[Op.or]:[{userId: userId, friend_userId: friend_userId},{userId: friend_userId, friend_userId: userId}], status:2}
            }).catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
            const [dataValues] = blockFriendData
            const blockListId = dataValues ? dataValues.userId : '';
            
            const reportCount = await feedReport(null, userId, 1);
            if (reportCount) {
                value.dataValues.report = reportCount.returnValue;
            }

            const reportFlag = await feedReportFlag(null, userId);
            if (reportFlag) {
                value.dataValues.reportFlag = reportFlag.returnValue;
            }

            next(
                new GeneralResponse("UserProfile get successfully.",[{ user_profile: userProfileData },{ user_photos: userPhotos },{ user_hobby: hobbyData },{ active_status: userStatus },{ user_friends: friendList },{ blocked_id: blockListId }],
                    config.HTTP_SUCCESS,
                    1
                )
            )
        } else {
            next(
                new GeneralResponse(
                    "Data not found.",
                    [],
                    config.HTTP_NOT_FOUND
                )
            );
        }
    } catch (err) {
        logger.error(err);
        next(new GeneralError(
            'Failed to view profile'
        ))
    }
}

exports.updateUserVideos = async(req, res, next) => {
    try {
         const video = req.files ? req.files[0].filename : ''
            const updateVideo = await userModel.update({ video }, {
                where: { userId: req.params.userId }
            })
            const [dataValues] = updateVideo
            if (dataValues === 1) {
                await next(
                    new GeneralResponse("Your video is added successfully.",updateVideo, config.HTTP_ACCEPTED,1)
                );
            } else {
                await next(
                    new GeneralResponse("Data not found.",[],config.HTTP_NOT_FOUND)
                );
            }   
    } catch (err) {
        logger.error(err);
        next(new GeneralError(
            'Failed to update'
        ))
    }
}

exports.deleteVideo = async(req, res, next) => {
    try {
        const { userId } = req.params;
        const userVideo = await userModel.update({ video: null }, {
            where: { userId }
        })
        const [dataValues] = userVideo
        if (dataValues === 1) {
            await next(
                new GeneralResponse("Your video is deleted successfully.",userVideo,config.HTTP_SUCCESS,1)
            );
        } else {
            await next(
                new GeneralResponse("Data not found.",[],config.HTTP_NOT_FOUND)
            );
        }
    } catch (err) {
        logger.error(err);
        next(new GeneralError(
            'Failed to delete'
        ))
    }
} 