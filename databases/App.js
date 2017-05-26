const {
    Sequelize,
    sequelize,
    NAME_TYPE,
 } = require('./sequelize');
const Token = require('./Token');

const App = sequelize.define('app', {
    name: {
        type: NAME_TYPE, 
        primaryKey: true,
    },
    redirect_uri: { 
        type: Sequelize.STRING, 
        allowNull: false, 
    }, 
});

App.NAME_OAUTH2 = 'oauth2';

module.exports = App;