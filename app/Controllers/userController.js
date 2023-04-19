'use strict';

const firebase = require('../helpers/db');
const User = require('../models/user');
const firestore = firebase.firestore();
require("dotenv").config();

// exports.userRegistration = async(req, res, next) => {
//     try {
//         const { phoneNo, password, fullName, country, device_token } =
//         req.body;
//         const email = req.body.email.toLowerCase()
//         const checkMail = email == "" ? "noemail2.com" : email;
//         const condition = { email: checkMail, phoneNo };
//         const userData = await homeModel
//             .findUser(["userId", "email", "phoneNo"], {
//                 [Op.or]: condition,
//             })
//             .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
//         if (userData.length) {
//             const [dataValues] = userData;        
//             if (parseInt(dataValues.phoneNo) === phoneNo || dataValues.email === email) {
//                 next(
//                     new GeneralResponse(
//                         "Mobile no or emailId is already registered with another account.",
//                         [],
//                         config.HTTP_ACCEPTED
//                     )
//                 );
//             }
//         } else {
//             const encryptedPassword = await bcrypt.hash(password, saltRounds);
//             const values = {
//                 email,
//                 phoneNo,
//                 password: encryptedPassword,
//                 fullName,
//                 country,
//                 device_token,
//             };
//             const registeredData = await userModel
//                 .create(values)
//                 .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
//             if (registeredData) {
//                 const client = new VoximplantApiClient(
//                   "./doc/aacf4f5d-318a-4bd6-9484-178355158657_private.json"
//                 );
//                 client.onReady = function () {
//                   client.Users.addUser({
//                     userName: `${phoneNo}`,
//                     userDisplayName: `${fullName}`,
//                     userPassword: `${email}`,
//                     applicationId: "10472362",
//                   });
//                 };
//                 await notification(
//                     device_token,
//                     "Registered successfully",
//                     "Congratulation ! You are registered successfully."
//                 ).then(async() => {
//                     const userNotificationData = {
//                         user_id: registeredData.userId,
//                         title: "Registered successfully",
//                         description: "Congratulation ! You are registered successfully.",
//                     };
//                     userNotification
//                         .create(userNotificationData)
//                         .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
//                 }).catch((err) => next(new GeneralResponse("Device token is not valid !",err,config.HTTP_BAD_REQUEST)));
//                 const user_setting = {
//                     notification: "1",
//                     age: "1",
//                     locationDistance: "1",
//                     friend: "1",
//                     userId: registeredData.userId,
//                 };
//                 userSetting
//                     .create(user_setting)
//                     .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
//             }
//             next(new GeneralResponse("You are registered successfully.",registeredData.userId, config.HTTP_CREATED,1));
//         }
//     } catch (err) {
//         logger.error("err", err);
//         next(new GeneralError("Failed to user registration"));
//     }
// };
// exports.userLogin = async(req, res, next) => {
//     try {
//         const { password, phoneNo } = req.body;
//         const email = req.body.email.toLowerCase();
//         const condition = { email : email ? email : '', phoneNo : phoneNo ? phoneNo : null };
//         const response = await homeModel
//             .findUser(["userId", "showMe", "password"], {
//                 [Op.or]: condition,
//             })
//             .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
//         if (response.length > 0) {
//             const [dataValues] = response;
//             const comparison = await bcrypt.compare(password, dataValues.password);
//             if (comparison) {
//                 let token = generateToken(dataValues.userId);
//                 await next(
//                     new GeneralResponse(
//                         "You are login successfully.",
//                         {
//                             userId: dataValues.userId,
//                             showMe: dataValues.showMe,
//                             token
//                         },
//                         config.HTTP_SUCCESS,
//                         1
//                     )
//                 );
//             } else {
//                 next(
//                     new GeneralResponse("Credential does not match.",[],config.HTTP_NOT_FOUND)
//                 );
//             }
//         } else {
//             next(
//                 new GeneralResponse("Data not found.",[],config.HTTP_NOT_FOUND)
//             );
//         }
//     } catch (err) {
//         logger.error("err", err);
//         next(new GeneralError("Failed to user login"));
//     }
// };

// exports.forgotPassword = async(req, res, next) => {
//     try {
//         const { email } = req.body;
//         const userData = await homeModel
//             .findUser(["userId", "email"], { email })
//             .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
//         if (userData.length > 0) {
//             const otpUpdate = await userModel.update({ matchedId: otp }, { where: { email } });
//             if (otpUpdate) {
//                 mailSend(
//                         email,
//                         "Forgot password",
//                         'To reset your password enter this verification code : "' + otp + '"'
//                     )
//                     .then(async() => {
//                         next(new GeneralResponse("Email has been sent.",otp, config.HTTP_SUCCESS,1));
//                     })
//                     .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
//             } else {
//                 next(
//                     new GeneralResponse("Data not updated.",[],config.HTTP_NOT_FOUND)
//                 );
//             }
//         } else {
//             next(
//                 new GeneralResponse("Data not found.",[],config.HTTP_NOT_FOUND)
//             );
//         }
//     } catch (err) {
//         logger.error("err", err);
//         next(new GeneralError("Failed to send email"));
//     }
// };

// exports.resetPassword = async(req, res, next) => {
//     try {
//         const { newPassword, matchedId } = req.body;
//         const userData = await homeModel
//             .findUser(["matchedId"], { matchedId })
//             .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
//         if (userData.length > 0) {
//             const encryptedPassword = await bcrypt.hash(newPassword, saltRounds);
//             const updatePassword = await userModel
//                 .update({ password: encryptedPassword }, { where: { matchedId } })
//                 .catch((err) => next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)));
//             if (updatePassword) {
//                 next(
//                     new GeneralResponse(
//                         "Your password is updated successfully.",
//                         undefined,
//                         config.HTTP_ACCEPTED,
//                         1
//                     )
//                 );
//             } else {
//                 next(
//                     new GeneralResponse("Your password is not updated.",[],config.HTTP_NOT_FOUND)
//                 );
//             }
//         } else {
//             next(
//                 new GeneralResponse("Data not found.",[],config.HTTP_NOT_FOUND)
//             );
//         }
//     } catch (err) {
//         logger.error("err", err);
//         next(new GeneralError("Failed to update"));
//     }
// };

// exports.changePassword = async(req, res, next) => {
//     try {
//         const userId = req.params.userId;

//         const updatePassword = { password: await bcrypt.hash(req.body.newPassword, saltRounds) };

//         const changePassword = await userModel.update(updatePassword, { where: { userId } })
//             .catch((err) =>next(new GeneralResponse("Something went wrong",err,config.HTTP_SERVER_ERROR)))
//         const [dataValues] = changePassword;
//         if (dataValues === 1) {
//             next(
//                 new GeneralResponse(
//                     "Your password is updated successfully.",
//                     undefined,
//                     config.HTTP_ACCEPTED,
//                     1
//                 )
//             );
//         } else {
//             next(
//                 new GeneralResponse("Please Try Again Later.",[], config.HTTP_NOT_FOUND)
//             );
//         }
//     } catch (err) {
//         logger.error("err", err);
//         next(new GeneralError("Failed to update"));
//     }
// };

const userRegistration = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if(data.empty) {
            res.status(404).send('No users record found');
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().middleName,
                    doc.data().age,
                    doc.data().phoneNumber,
                    doc.data().gender,
                    doc.data().dob,
                    doc.data().isValid,
                );
                usersArray.push(user);
            });
            res.send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        if(!data.exists) {
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await firestore.collection('users').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        await user.update({isValid: false});
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    userRegistration,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}