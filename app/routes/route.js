const express = require('express');
const { userRegistration, userLogin, forgotPassword, updatePassword, getAllUsers, getUser, updateUser, deleteUser } = require('../Controllers/userController');
const { authenticate } = require('../helpers/auth');

const router = express.Router();

router.post('/user/registration', userRegistration);
router.post('/user/login', userLogin)
router.post('/user/forgotPassword', forgotPassword)
router.put('/user/updatePassword/:id', updatePassword)
router.get('/users', getAllUsers);
router.get('/user/:id', authenticate, getUser);
router.put('/user/:id', authenticate, updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
