const {
    Sequelize,
    sequelize,
    NAME_TYPE,
 } = require('./sequelize');
const User = require('./User');
const App = require('./App');

const Code = sequelize.define('code', {
    user_name: {
        type: NAME_TYPE,
        allowNull: false,
        unique: 'compositeIndex',       // upsert 操作需要根据住建或者唯一索引来确定一个 row
        references: {
            model: User,
            key: 'name',
        }
    },
    app_name: {
        type: NAME_TYPE,
        allowNull: false,
        unique: 'compositeIndex',        
        references: {
            model: App,
            key: 'name',
        }
    },

    code: {
        type: Sequelize.STRING,
    },
});


module.exports = Code;