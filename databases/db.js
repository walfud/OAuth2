const { sequelize } = require('./sequelize');
const User = require('./User');
const App = require('./App');
const Token = require('./Token');
const Code = require('./Code');

Token.belongsTo(User, { foreignKey: 'user_id' });
Token.belongsTo(App, { foreignKey: 'app_id' });

module.exports = {
    sequelize,

    User,
    App,
    Token,
    Code,
};
