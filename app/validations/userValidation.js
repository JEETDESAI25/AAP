const Joi = require('@hapi/joi');
module.exports = {
    registration: Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),
        phoneNo: Joi.number().required().messages({
            "number.empty": `Phone number cannot be an empty field`,
            "number.base": `Phone Number should be a type of number`,
            "number.unsafe" : `Phone Number should be a type of number`,
            "any.required": `Phone number is a required field`,
        }),
        password: Joi.string().empty().required().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "any.required": `password is a required field`,
        }),
        fullName: Joi.string().required().empty().messages({
            "string.base": `fullName should be a type of 'text'`,
            "string.empty": `fullName cannot be an empty field`,
            "any.required": `fullName is a required field`,
        }),
        country: Joi.string().empty().required().messages({
            "string.empty": `country cannot be an empty field`,
            "string.country": `country format not valid`,
            "any.required": `country is a required field`,
        }),
        device_token: Joi.string().required().empty().messages({
            "string.base": `device_token should be a type of 'text'`,
            "string.empty": `device_token cannot be an empty field`,
            "any.required": `device_token is a required field`,
        })

    }),
    updateProfileRegister: Joi.object({
        gender: Joi.string().empty().required().messages({
            "string.empty": `Gender cannot be an empty field`,
            "string.Gender": `Gender format not valid`,
            "any.required": `Gender is a required field`,
        }),
        location: Joi.string().empty().messages({
            "string.empty": `location cannot be an empty field`,
            "string.location": `location format not valid`,
        }),
        latitude: Joi.string().empty().messages({
            "string.empty": `latitude cannot be an empty field`,
            "string.latitude": `latitude format not valid`,
        }),
        longtitude: Joi.string().empty().messages({
            "string.empty": `longtitude cannot be an empty field`,
            "string.longtitude": `longtitude format not valid`,
        }),
        DOB: Joi.string().empty().required().messages({
            "string.empty": `DOB cannot be an empty field`,
            "string.DOB": `DOB format not valid`,
            "any.required": `DOB is a required field`,
        }),
        nickName: Joi.string().empty().required().messages({
            "string.empty": `nickname cannot be an empty field`,
            "string.nickname": `nickname format not valid`,
            "any.required": `nickname is a required field`,
        }),
        smoking: Joi.number().empty().required().messages({
            "number.empty": `smoking cannot be an empty field`,
            "number.smoking": `smoking format not valid`,
            "any.required": `smoking is a required field`,
        }),
        drinking: Joi.number().empty().required().messages({
            "number.empty": `drinking cannot be an empty field`,
            "number.drinking": `drinking format not valid`,
            "any.required": `drinking is a required field`,
        }),
        showMe: Joi.string().empty().required().valid('Man', 'Woman', 'Both').messages({
            "string.empty": `showMe cannot be an empty field`,
            "any.only": `showMe must be 'Man', 'Woman', 'Both'`,
            "string.showMe": `showMe format not valid`,
            "any.required": `showMe is a required field`,
        }),
        education: Joi.string().empty().required().messages({
            "string.empty": `education cannot be an empty field`,
            "string.education": `education format not valid`,
            "any.required": `education is a required field`,
        }),
        education_other: Joi.string().empty().required().messages({
            "string.empty": `education_other cannot be an empty field`,
            "string.education_other": `education_other format not valid`,
            "any.required": `education_other is a required field`,
        }),
        my_interest: Joi.string().empty().required().valid('Relationship', 'Just_Friend', 'Will_See').messages({
            "string.empty": `my_interest cannot be an empty field`,
            "any.only": `my_interest must be 'Relationship', 'Just_Friend', 'Will_See'`,
            "string.my_interest": `my_interest format not valid`,
            "any.required": `my_interest is a required field`,
        }),
        hobby: Joi.required().empty().messages({
            "string.empty": `Hobby cannot be an empty field`,
            "any.required": `Hobby is a required field`
        })
    }),
    updateProfileR: Joi.object({
        id: Joi.number().required().empty().messages({
            "number.base": `Id should be a type of 'number'`,
            "number.empty": `Id cannot be an empty field`,
            "any.required": `Id is a required field`
        }),
    }),
    updateProfile: Joi.object({
        fullName: Joi.string().empty().required().messages({
            "string.empty": `fullName cannot be an empty field`,
            "string.fullName": `fullName format not valid`,
            "any.required": `fullName is a required field`,
        }),
        nickName: Joi.string().empty().required().messages({
            "string.empty": `nickname cannot be an empty field`,
            "string.nickname": `nickname format not valid`,
            "any.required": `nickname is a required field`,
        }),
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),
        phoneNo: Joi.number().integer().required().messages({
            "number.empty": `Phone number cannot be an empty field`,
            "any.required": `Phone number is a required field`,
        }),
        country: Joi.string().empty().required().messages({
            "string.empty": `country cannot be an empty field`,
            "string.country": `country format not valid`,
            "any.required": `country is a required field`,
        }),
        gender: Joi.string().empty().required().messages({
            "string.empty": `gender cannot be an empty field`,
            "string.gender": `gender format not valid`,
            "any.required": `gender is a required field`,
        }),
        location: Joi.string().empty().required().messages({
            "string.empty": `location cannot be an empty field`,
            "string.location": `location format not valid`,
            "any.required": `location is a required field`,
        }),
        DOB: Joi.string().empty().required().messages({
            "string.empty": `DOB cannot be an empty field`,
            "string.DOB": `DOB format not valid`,
            "any.required": `DOB is a required field`,
        }),
        description: Joi.string().empty().required().messages({
            "string.empty": `description cannot be an empty field`,
            "string.description": `description format not valid`,
            "any.required": `description is a required field`,
        }),
        height: Joi.string().empty().required().messages({
            "string.empty": `height cannot be an empty field`,
            "string.height": `height format not valid`,
            "any.required": `height is a required field`,
        }),
        showMe: Joi.string().empty().required().valid('Man', 'Woman', 'Both').messages({
            "string.empty": `showMe cannot be an empty field`,
            "any.only": `showMe must be 'Man', 'Woman', 'Both'`,
            "string.showMe": `showMe format not valid`,
            "any.required": `showMe is a required field`,
        }),
        education: Joi.string().empty().required().messages({
            "string.empty": `education cannot be an empty field`,
            "string.education": `education format not valid`,
            "any.required": `education is a required field`,
        }),
        education_other: Joi.string().empty().required().messages({
            "string.empty": `education_other cannot be an empty field`,
            "string.education_other": `education_other format not valid`,
            "any.required": `education_other is a required field`,
        }),
        my_interest: Joi.string().empty().required().valid('Relationship', 'Just_Friend', 'Will_See').messages({
            "string.empty": `my_interest cannot be an empty field`,
            "any.only": `my_interest must be 'Relationship', 'Just_Friend', 'Will_See'`,
            "string.my_interest": `my_interest format not valid`,
            "any.required": `my_interest is a required field`,
        }),
        smoking: Joi.number().empty().required().messages({
            "number.empty": `smoking cannot be an empty field`,
            "number.smoking": `smoking format not valid`,
            "any.required": `smoking is a required field`,
        }),
        drinking: Joi.number().empty().required().messages({
            "number.empty": `drinking cannot be an empty field`,
            "number.drinking": `drinking format not valid`,
            "any.required": `drinking is a required field`,
        }),
    }),
    userLogin: Joi.object({
        email: Joi.string().empty().email().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email cannot be an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        }),
        phoneNo: Joi.number().integer().messages({
            "number.empty": `Phone number cannot be an empty field`,
        }),
        password: Joi.string().empty().required().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "any.required": `password is a required field`,
        }),

    }),
    forgotPassword: Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email cannot be an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        }),
    }),
    resetPassword: Joi.object({
        matchedId: Joi.string().empty().required().messages({
            "string.base": `matchedId should be a type of text`,
            "string.empty": 'matchedId is not allowed to be empty',
            "any.required": `matchedId is Required`,
        }),
        newPassword: Joi.string().empty().required().messages({
            "string.base": `newPassword should be a type of 'text'`,
            "string.empty": `newPassword cannot be an empty field`,
            "any.required": `newPassword is a required field`,
        }),

    }),
    loginSocialAcc: Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email cannot be an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        }),

    }),

    changePassword: Joi.object({
        newPassword: Joi.string().empty().required().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "any.required": `password is a required field`,
        }),
    }),
    paramsValidation: Joi.object({
        userId: Joi.number().required().empty().messages({
            "number.base": `userId should be a type of 'number'`,
            "number.empty": `userId cannot be an empty field`,
            "any.required": `userId is a required field`
        }),
    }),
    userProfile:Joi.object({
        userId: Joi.number().required().empty().messages({
            "number.base": `userId should be a type of 'number'`,
            "number.empty": `userId cannot be an empty field`,
            "any.required": `userId is a required field`
        }),
        friend_userId:Joi.number().required().empty().messages({
            "number.base": `Friend userId should be a type of 'number'`,
            "number.empty": `Friend userId cannot be an empty field`,
            "any.required": `Friend userId is a required field`
        }),
    }),
    userProfileAll: Joi.object({
        userId: Joi.number().required().empty().messages({
            "number.base": `userId should be a type of 'number'`,
            "number.empty": `userId cannot be an empty field`,
            "any.required": `userId is a required field`
        }),
        showMe: Joi.string().empty().required().valid('Man', 'Woman', 'Both').messages({
            "string.empty": `showMe cannot be an empty field`,
            "any.only": `showMe must be 'Man', 'Woman', 'Both'`,
            "string.showMe": `showMe format not valid`,
            "any.required": `showMe is a required field`,
        }),
    }),
    newUserProfile: Joi.object({
        userId: Joi.number().required().empty().messages({
            "number.base": `userId should be a type of 'number'`,
            "number.empty": `userId cannot be an empty field`,
            "any.required": `userId is a required field`
        }),
        showMe: Joi.string().empty().required().valid('Man', 'Woman', 'Both').messages({
            "string.empty": `showMe cannot be an empty field`,
            "any.only": `showMe must be 'Man', 'Woman', 'Both'`,
            "string.showMe": `showMe format not valid`,
            "any.required": `showMe is a required field`,
        }),
        flag: Joi.number().messages({
            "number.base": `flag should be a type of 'number'`,
        })
    }),

    updateProfileImage: Joi.object({
        userId: Joi.number().required().empty().messages({
            "number.base": `userId should be a type of 'number'`,
            "number.empty": `userId cannot be an empty field`,
            "any.required": `userId is a required field`
        }),
        id: Joi.number().required().empty().messages({
            "number.base": `Id should be a type of 'number'`,
            "number.empty": `Id cannot be an empty field`,
            "any.required": `Id is a required field`
        }),
    }),

    discoverVideo: Joi.object({
        userId: Joi.number().required().empty().messages({
            "number.base": `userId should be a type of 'number'`,
            "number.empty": `userId cannot be an empty field`,
            "any.required": `userId is a required field`
        }),
    }),
     paramValidation: Joi.object({
        userId: Joi.number().required().empty().messages({
            "number.base": `userId should be a type of number`,
            "number.empty": `userId cannot be an empty field`,
            "any.required": `userId is a required field`,
        }),
        friend_userId: Joi.number().required().empty().messages({
            "number.base": `friend_userId should be a type of 'number'`,
            "number.empty": `friend_userId cannot be an empty field`,
            "any.required": `friend_userId is a required field`,
        })
    }),
     profileValidate: Joi.object({
        userId: Joi.number().required().empty().messages({
            "number.base": `Id should be a type of number`,
            "number.empty": `Id cannot be an empty field`,
            "any.required": `Id is a required field`,
        })
    }),


    addSingleHobby: Joi.object({
        userId: Joi.number().required().empty().messages({
            "number.base": `userId should be a type of 'number'`,
            "number.empty": `userId cannot be an empty field`,
            "any.required": `userId is a required field`
        }),
        hobby: Joi.string().required().empty().messages({
            "number.base": `hobby should be a type of 'text'`,
            "number.empty": `hobby cannot be an empty field`,
            "any.required": `hobby is a required field`
        }),
    }),

    hobbyValidation: Joi.object({
        id: Joi.number().required().empty().messages({
            "number.base": `Id should be a type of 'number'`,
            "number.empty": `Id cannot be an empty field`,
            "any.required": `Id is a required field`,
        })
    }),
    userHobbyValidation: Joi.object({
        hobby: Joi.string().required().empty().messages({
            "string.base": `hobby should be a type of 'text'`,
            "string.empty": `hobby cannot be an empty field`,
            "any.required": `hobby is a required field`,
        })
    })
}