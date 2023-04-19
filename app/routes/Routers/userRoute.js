const express = require('express');
const router = express();
const userController = require('../../Controllers/userController');
const { validator } = require("../../helpers/validator");
const userValidation = require('../../validations/userValidation');
const { multipleUpload } = require("../../services/multer");
const { upload } = require('../../services/multer');
const { authenticate } = require('../../helpers/auth');
const { videoUpload } = require('../../services/multer')


router.post('/api/category/userRegistration', validator.body(userValidation.registration), userController.userRegistration);

router.put('/api/category/updateProfileRegister/:id', multipleUpload, validator.params(userValidation.updateProfileR), validator.body(userValidation.updateProfileRegister), userController.updateProfileRegister);

router.put('/api/category/updateProfile/:id', authenticate, upload, validator.params(userValidation.updateProfileR), validator.body(userValidation.updateProfile), userController.updateProfile);

router.post('/api/category/userLogin', validator.body(userValidation.userLogin), userController.userLogin);

router.post('/api/category/forgotPassword', validator.body(userValidation.forgotPassword), userController.forgotPassword);

router.post('/api/category/resetPassword', validator.body(userValidation.resetPassword), userController.resetPassword);

router.get('/api/category/loginWithSocialAcc/:email', validator.params(userValidation.loginSocialAcc), userController.userSocialAcc);

router.post('/api/category/newUserProfile', authenticate, validator.body(userValidation.newUserProfile), userController.newUserProfile);

router.put('/api/category/changePassword/:userId', authenticate, validator.params(userValidation.paramsValidation), validator.body(userValidation.changePassword), userController.changePassword);

router.get('/api/category/getUserProfile/:userId', authenticate, validator.params(userValidation.paramsValidation), userController.getUserProfile);

router.post('/api/category/userProfileAll', authenticate, validator.body(userValidation.userProfileAll), userController.userProfileAll);

router.put('/api/category/updateProfileImages/:userId/:id', authenticate, upload, validator.params(userValidation.updateProfileImage), userController.updateProfileImages);

router.get('/api/category/discoverVideo/:userId', authenticate, validator.params(userValidation.discoverVideo), userController.discoverVideo);

router.post('/api/category/addProfileImages', authenticate, upload, validator.body(userValidation.paramsValidation), userController.addProfileImages);

router.delete('/api/category/deleteProfileImages/:id', authenticate, validator.params(userValidation.updateProfileR), userController.deleteProfileImages);

router.post('/api/category/addSingleHobby', authenticate, validator.body(userValidation.addSingleHobby), userController.addSingleHobby);

router.delete('/api/category/deleteSingleHobby/:id', authenticate, validator.params(userValidation.updateProfileR), userController.deleteSingleHobby);

router.put('/api/category/updateSingleHobby/:id', authenticate, upload, validator.params(userValidation.hobbyValidation), validator.body(userValidation.userHobbyValidation), userController.updateSingleHobby);

router.get('/api/category/userProfile/:userId/:friend_userId', authenticate, validator.params(userValidation.userProfile), userController.userProfile);

router.put('/api/category/updateProfileVideos/:userId', authenticate, videoUpload, validator.params(userValidation.profileValidate), userController.updateUserVideos);

router.delete('/api/category/deleteProfileVideos/:userId', authenticate, videoUpload, validator.params(userValidation.profileValidate), userController.deleteVideo);

module.exports = router;