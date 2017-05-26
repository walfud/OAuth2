const {
    Sequelize,
    sequelize,
    NAME_TYPE,
 } = require('./sequelize');
const User = require('./User');
const App = require('./App');

const Token = sequelize.define('token', {
    user_name: {
        type: NAME_TYPE,
        allowNull: false,
        references: {
            model: User,
            key: 'name',
        }
    },
    app_name: {
        type: NAME_TYPE,
        allowNull: false,
        references: {
            model: App,
            key: 'name',
        }
    },

    oid: {
        type: NAME_TYPE,
        primaryKey: true,
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