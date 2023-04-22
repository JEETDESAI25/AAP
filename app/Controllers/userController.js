'use strict';

const bcrypt = require('bcrypt');
const firebase = require('../helpers/db');
const User = require('../models/user');
const { GeneralResponse } = require('../utils/response');
const { GeneralError, BadRequest, NotFound } = require('../utils/error');
const { mailSend } = require("../services/mail");
const firestore = firebase.firestore();
const { generateToken } = require("../helpers/auth");
var otp = Math.floor(1000 + Math.random() * 9000);
require("dotenv").config();

const userRegistration = async (req, res, next) => {
    try {
        let data = req.body;
        const user = await firestore.collection('users').where("email", "==", data.email);
        const existingUser = await user.get();
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
                new GeneralResponse("Record saved successfully.", data)
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
        existingUser.forEach(doc => { usersArray.push(doc.id) });

        if (usersArray.length > 0) {
            const comparison = await bcrypt.compare(data.password, usersArray[0]);
            if (comparison) {
                const response = {
                    userId: usersArray[1]
                }
                response.token = generateToken(usersArray[1]);
                next(
                    new GeneralResponse("You are login successfully.", response)
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
                req.body.email,
                "Forgot password",
                'To reset your password enter this verification code : "' + otp + '"'
            )
                .then(async () => {
                    next(new GeneralResponse(`Email has been sent.`, { userId: usersArray[0], otp }));
                })
                .catch((err) => {
                    console.log(err)
                    next(new GeneralError("Something went wrong"))
                });
        }
    } catch (error) {
        next(new GeneralError("Error Generated."));
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await firestore.collection('users').doc(id);
        await user.update({ password });
        next(
            new GeneralResponse("User password updated successfully.")
        );
    } catch (error) {
        next(new GeneralError("Error Generated."));
    }
}

// Admin Panel
const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if (data.empty) {
            next(
                new NotFound("Data not found.")
            );
        } else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().middleName,
                    doc.data().email,
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
            next(
                new GeneralResponse("Users Data retrieved successfully.", usersArray)
            );
        }
    } catch (error) {
        next(new GeneralError("Error Generated."));
    }
}

// auth
const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        if (!data.exists) {
            next(
                new NotFound("Data not found.")
            );
        } else {
            next(
                new GeneralResponse("User Data retrieved successfully.", data.data())
            );
        }
    } catch (error) {
        next(new GeneralError("Error Generated."));
    }
}

// auth
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await firestore.collection('users').doc(id);
        await user.update(data);
        next(
            new GeneralResponse("User Data updated successfully.")
        );
    } catch (error) {
        next(new GeneralError("Error Generated."));
    }
}

// Admin Panel
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        await user.update({ isValid: false });
        next(
            new GeneralResponse("User Data deleted successfully.")
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    userRegistration,
    userLogin,
    forgotPassword,
    updatePassword,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}