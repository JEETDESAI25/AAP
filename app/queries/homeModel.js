const db = require("../model/sequelize");
const User = db.registration;
const userSetting = db.userSetting;
const feedModel = db.userFeed;
const friendModel = db.userFriend;
const userFavoriteModel = db.userFavorite;
const userHobbyModel = db.userHobby;
const commentModel = db.feedCommentReplyLike;
const adminSubscriptionModel = db.adminSubscription;
const { Op } = require("sequelize");
const moment = require("moment");

const findUser = (attributes, condition, orderBy = '', differentFiled = {}) =>
    new Promise((resolve, reject) => {
        User.findAll({
            attributes,
            where: condition,
            order: orderBy ? [orderBy] : '',
            subQuery: differentFiled ? false : true
        }).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    });

const findUserSetting = (attributes, condition) =>
    new Promise((resolve, reject) => {
        userSetting.findAll({
            attributes,
            where: condition,
        }).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    });


const searchName = (conditionvalue, conditionfield, attributes, table, condition, fieldname) => {
    return new Promise((resolve, reject) => {
        if (conditionfield != undefined) {
            where = "WHERE " + conditionfield;
        }
        if (conditionvalue != undefined) {
            where = " Like '%" + conditionvalue + "%'";
        }
        if (condition != undefined && condition != "") {
            where = " AND " + fieldname + " != " + condition;
        }
        table.findAll({
            attributes,
            where: condition
        }).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    })
}
const findFeedSetting = (attributes, condition) =>
    new Promise((resolve, reject) => {
        feedModel.findAll({
            attributes,
            where: condition,
        }).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    });

const searchName1 = (conditionvalue, conditionfield, attributes, table, user_id, fieldname) => {
    return new Promise((resolve, reject) => {
        if (conditionfield != undefined) {
            where = "WHERE " + conditionfield;
        }
        if (conditionvalue != undefined) {
            where += " Like '%" + conditionvalue + "%'";
        }
        if (user_id != undefined && user_id != "") {
            where += " AND " + fieldname + " = " + user_id;
        }
        table.findAll({
            attributes,
            where: user_id
        }).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    })
}

const findFeedData = (
        model1,
        model2,
        foreignKey1,
        foreignKey2,
        attributes1,
        attributes2,
        object,
    ) =>

    new Promise((resolve, reject) => {
        model1.hasMany(model2, { foreignKey: foreignKey1 });
        model2.belongsTo(model1, { foreignKey: foreignKey2 });
        model2
            .findAndCountAll({
                attributes: attributes1,
                order: object.orderBy ? [object.orderBy] : "",
                limit: object.limit,
                subQuery: object.limit ? false : true,
                offset:object.offset,
                where: object.condition,
                include: [{
                    model: model1,
                    attributes: attributes2,
                    required: true,
                    where: object.conditionInInclude,
                }, ],
            })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
const findUserHobby = (attributes, condition, orderBy = "") =>
    new Promise((resolve, reject) => {
        userHobbyModel
            .findAll({
                attributes,
                where: condition,
                order: orderBy ? [orderBy] : "",
            })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
const replyFlag = (reply_id, userId) =>
    new Promise((resolve, reject) => {
        const reply = commentModel.findAll({
            attributes: ['id', 'reply_id', 'userId'],
            where: {
                [Op.and]: [{ reply_id: reply_id }, { userId: userId }]
            }
        })
        if (reply.length > 0) {
            resolve({
                returnValue: 1
            });
        } else {
            resolve({
                returnValue: 0
            });
        }
    })
const differenceAge = (resultSearch, ageFrom, ageTo) => {
    return resultSearch.itemList.filter(function(resultSearchData) {
        return resultSearchData.age > ageFrom &&
            resultSearchData.age < ageTo
    })
}

const expiryDate = async (planId, timestamp) => {
  const endDate = await adminSubscriptionModel.findAll({
    attributes: ["duration"],
    where: { id: planId },
  });
  let expiryTime;
  return new Promise((resolve, reject) => {
    if (endDate) {
      const [dataValues] = endDate;
      const duration = parseInt(dataValues.duration.slice(0, 1));
      expiryTime = moment(timestamp).add(duration, "months").format();
      resolve(expiryTime);
    }
  });
};
const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data) => {
    const { count: totalItems, rows: itemList } = data;
    return { totalItems, itemList };
};

const findAndCountData = (attributes, condition, limit, offset, order) =>
    new Promise((resolve, reject) => {
        User.findAndCountAll({
            attributes,
            where: condition,
            order: order ? [order] : '',
            limit,
            offset,
        }).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });

    });

const searchFeedData = (conditionvalue, conditionfield, attributes, table, condition, limit, offset, fieldname) => {
    return new Promise((resolve, reject) => {
        if (conditionfield != undefined) {
            where = "WHERE " + conditionfield;
        }
        if (conditionvalue != undefined) {
            where = " Like '%" + conditionvalue + "%'";
        }
        if (condition != undefined && condition != "") {
            where = " AND " + fieldname + " != " + condition;
        }
        table.findAndCountAll({
            attributes,
            where: condition,
            limit,
            offset
        }).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    })
}

module.exports = {
    findUser,
    findUserSetting,
    searchName,
    findFeedSetting,
    searchName1,
    findFeedData,
    findUserHobby,
    replyFlag,
    differenceAge,
    expiryDate,
    getPagination,
    getPagingData,
    findAndCountData,
    searchFeedData,
};