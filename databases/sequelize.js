const Sequelize = require('sequelize');

const sequelize = new Sequelize('test_oauth2', 'test', '123456', {
    host: 'mysql',
    dialect: 'mysql',
    // logging: false,

    define: {
        engine: 'MYISAM',
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    }
});


module.exports = {
    Sequelize,
    sequelize,
    NAME_TYPE: Sequelize.STRING(64),
};