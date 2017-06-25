const {
    Sequelize,
    sequelize,
 } = require('./sequelize');
const User = require('./User');
const App = require('./App');

const Code = sequelize.define('Code', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: 'indexUserIdAppId',
    },
    appId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: 'indexUserIdAppId',
    },

    code: {
        type: Sequelize.STRING,
        allowNull: false,        
    },
});


module.exports = Code;