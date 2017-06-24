const {
    Sequelize,
    sequelize,
 } = require('./sequelize');
const User = require('./User');
const App = require('./App');

const Token = sequelize.define('token', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    app_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },

    oid: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    access_token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});


module.exports = Token;