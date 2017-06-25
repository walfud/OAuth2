const {
    Sequelize,
    sequelize,
 } = require('./sequelize');
const User = require('./User');
const App = require('./App');

const Token = sequelize.define('Token', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: 'indexUserIdAppId',
    },
    appId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: 'indexUserIdAppId',
    },

    oid: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    accessToken: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});


module.exports = Token;