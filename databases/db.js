const { sequelize } = require('./sequelize');
const User = require('./User');
const App = require('./App');
const Token = require('./Token');
const Code = require('./Code');

Token.belongsTo(User, { foreignKey: 'userId' });
Token.belongsTo(App, { foreignKey: 'appId' });

module.exports = {
    sequelize,

    User,
    App,
    Token,
    Code,
};
