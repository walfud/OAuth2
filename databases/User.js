const {
    Sequelize,
    sequelize,
 } = require('./sequelize');
const Token = require('./Token');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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