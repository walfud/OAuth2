const {
    Sequelize,
    sequelize,
 } = require('./sequelize');
const Token = require('./Token');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User;