'use strict';

const bcrypt = require('bcrypt');
const firebase = require('../helpers/db');
const User = require('../models/user');
const { GeneralResponse } = require('../utils/response');
const { GeneralError, BadRequest, NotFound } = require('../utils/error');
const { mailSend } = require("../services/mail");
const firestore = firebase.firestore();
var otp = Math.floor(1000 + Math.random() * 9000);
require("dotenv").config();


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
        let data = req.body;
        const users = await firestore.collection('users').where("email", "==", data.email);
        const existingUser = await users.get();
        const usersArray = [];

        existingUser.forEach(doc => { usersArray.push(doc.id) });

        if (usersArray.length > 0) {
            next(
                new BadRequest("Record already exist.")
            );
        } else {
            data.password = await bcrypt.hash(data.password, 10);
            await firestore.collection('users').doc().set(data);
            next(
                new GeneralResponse(
                    "Record saved successfully.")
            );
        }
    } catch (error) {
        return next(new GeneralError("User registration failed"));
    }
}

const userLogin = async (req, res, next) => {
    try {
        let data = req.body;
        const users = await firestore.collection('users').where("email", "==", data.email);
        const existingUser = await users.get();
        const usersArray = [];

        existingUser.forEach(doc => { usersArray.push(doc.data().password) });

        if (usersArray.length > 0) {
            const comparison = await bcrypt.compare(data.password, usersArray[0]);
            if (comparison) {
                next(
                    new GeneralResponse("You are login successfully.")
                );
            } else {
                next(
                    new BadRequest("Credential does not match.")
                );
            }
        } else {
            next(
                new NotFound("Data not found.")
            );
        }
    } catch (error) {
        next(new GeneralError("User login failed."));
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const user = await firestore.collection('users').where("email", "==", req.body.email);
        const data = await user.get();
        const usersArray = [];

        data.forEach(doc => { usersArray.push(doc.id) });

        if (usersArray.length == 0) {
            next(
                new NotFound("Data not found.")
            );
        } else {
            mailSend(
                email,
                "Forgot password",
                'To reset your password enter this verification code : "' + otp + '"'
            )
                .then(async () => {
                    next(new GeneralResponse(`${usersArray[0]} has been sent ${otp}`));
                })
                .catch((err) => next(new GeneralResponse("Something went wrong", err, config.HTTP_SERVER_ERROR)));
        }
    } catch (error) {
        next(new GeneralError("Error Generated."));
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await bcrypt.hash(req.body.password, 10);
        const user = await firestore.collection('users').doc(id);
        await user.update(data);
        res.send('User password updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if (data.empty) {
            res.status(404).send('No users record found');
        } else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().middleName,
                    doc.data().age,
                    doc.data().phoneNumber,
                    doc.data().password,
                    doc.data().gender,
                    doc.data().dob,
                    doc.data().isValid,
                );
                delete user.password;
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
        if (!data.exists) {
            res.status(404).send('Student with the given ID not found');
        } else {
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
        await user.update({ isValid: false });
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    userRegistration,
    userLogin,
    forgotPassword,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}