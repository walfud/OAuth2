const {
    Sequelize,
    sequelize,
 } = require('./sequelize');
const User = require('./User');
const App = require('./App');

const Code = sequelize.define('code', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: 'compositeIndex',
    },
    app_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: 'compositeIndex',
    },

    code: {
        type: Sequelize.STRING,
        allowNull: false,        
    },
});


module.exports = Code;