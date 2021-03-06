const {
    Sequelize,
    sequelize,
 } = require('./sequelize');
const Token = require('./Token');

const App = sequelize.define('App', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    redirectUri: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

App.OAUTH2_ID = 1;
App.OAUTH2_NAME = 'oauth2';

module.exports = App;