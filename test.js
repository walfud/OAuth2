const {
    Sequelize,
    sequelize,
} = require('./databases/sequelize');
const User = require('./databases/User');
const App = require('./databases/App');
const Token = require('./databases/Token');

(async function () {
    User.hasMany(Token, { as: "OAuth2s" });
    App.hasMany(Token, { as: "OAuth2s" });

    console.log(! await App.findOne({where: {name: 'aaa'}}))
})()