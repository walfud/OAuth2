const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
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
