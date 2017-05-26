const {
    Sequelize,
    sequelize,
    NAME_TYPE,
 } = require('./sequelize');
const Token = require('./Token');

const User = sequelize.define('user', {
    name: {
        type: NAME_TYPE, 
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User;