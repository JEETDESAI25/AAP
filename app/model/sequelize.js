const dbConfig = require("../helpers/db");
const logger = require('../loggers/logger');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
});

sequelize.authenticate()
    .then(() => {
        logger.info('connected to mysql..')
    })
    .catch(err => {
        logger.error(err)
    })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userFeed = require('./models/userFeed')(sequelize, Sequelize)
db.userFriend = require('./models/userFriend')(sequelize, Sequelize)
db.registration = require('./models/registration')(sequelize, Sequelize);
db.userSetting = require('./models/userSetting')(sequelize, Sequelize);
db.userNotification = require('./models/userNotification')(sequelize, Sequelize);
db.userHobby = require('./models/userHobby')(sequelize, Sequelize);
db.userPhotos = require('./models/userPhotos')(sequelize, Sequelize);
db.feedCommentLike = require('./models/feedCommentLike')(sequelize, Sequelize)
db.feedLike = require('./models/feedLike')(sequelize, Sequelize);
db.feedCommentReply = require('./models/feedCommentReply')(sequelize, Sequelize);
db.feedCommentReplyLike = require('./models/feedCommentReplyLike')(sequelize, Sequelize);
db.userLogin = require('./models/userLogin')(sequelize, Sequelize);
db.userFavorite = require('./models/userFavorite')(sequelize, Sequelize);
db.feedComment = require('./models/feedComment')(sequelize, Sequelize);
db.userChat = require('./models/userChat')(sequelize, Sequelize);
db.userPayment = require('./models/userPayment')(sequelize, Sequelize);
db.adminCountryCurrency = require('./models/adminCountryCurrency')(sequelize, Sequelize);
db.adminCurrencyRatio = require('./models/adminCurrencyRatio')(sequelize, Sequelize);
db.adminSubscription = require('./models/adminSubscription')(sequelize, Sequelize);
db.paymentCharges = require('./models/paymentCharges')(sequelize, Sequelize);
db.wishlist = require('./models/wishlist')(sequelize, Sequelize);
db.feedReport = require('./models/feedReport')(sequelize, Sequelize);
db.feedBlock = require('./models/feedBlock')(sequelize, Sequelize);

db.registration.hasMany(db.userFeed, { foreignKey: 'userId' });
db.registration.hasMany(db.feedComment, { foreignKey: 'userId' });
db.registration.hasMany(db.userFavorite, { foreignKey: 'fav_userId' ,as:'userFavorite' });
db.registration.hasMany(db.userFriend, { foreignKey: 'userId' ,as:"userFriend"});
db.userFriend.belongsTo(db.registration, { foreignKey: 'userId' ,as:"userFriend"});
db.registration.hasMany(db.feedCommentReply, { foreignKey: "userId" });
db.feedCommentReply.belongsTo(db.registration, { foreignKey: "userId" });
db.adminSubscription.hasMany(db.userPayment, { foreignKey: 'planId' });
db.userPayment.belongsTo(db.adminSubscription, { foreignKey: 'id' });



db.userFeed.belongsTo(db.registration, { foreignKey: "userId" });
db.registration.hasMany(db.feedLike, { foreignKey: "id" });
db.feedLike.belongsTo(db.registration, { foreignKey: "id" });
db.registration.hasMany(db.userFavorite, { foreignKey: "userId" });
db.userFavorite.belongsTo(db.registration, { foreignKey: "fav_userId" });
db.registration.hasMany(db.userFriend, { foreignKey: "friend_userId" });
db.userFriend.belongsTo(db.registration, {foreignKey: "friend_userId"});
db.userLogin.hasMany(db.userFriend,{ foreignKey:"friend_userId", sourceKey:'userId'});
db.userFriend.belongsTo(db.userLogin,{ foreignKey:"userId", targetKey: 'userId'});
db.registration.hasMany(db.userHobby, { foreignKey: "userId" });
db.adminSubscription.hasMany(db.userPayment, { foreignKey: "planId" });
db.registration.hasMany(db.wishlist, { foreignKey: 'user_id', as: 'wishlistUserId' });
db.registration.hasMany(db.wishlist, { foreignKey: 'friend_id' ,as:'wishlistFriendId' });



module.exports = db;