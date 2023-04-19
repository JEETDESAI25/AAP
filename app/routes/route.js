const express = require('express');
const {userRegistration, getAllUsers, getUser, updateUser, deleteUser} = require('../Controllers/userController');

const router = express.Router();

router.post('/user/registration', userRegistration);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
