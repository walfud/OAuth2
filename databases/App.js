const {
    Sequelize,
    sequelize,
 } = require('./sequelize');
const Token = require('./Token');

const App = sequelize.define('app', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    redirect_uri: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

App.OAUTH2_ID = 1;
App.OAUTH2_NAME = 'oauth2';

module.exports = App;