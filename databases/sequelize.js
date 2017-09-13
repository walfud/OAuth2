const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: 'mysql',
    dialect: 'mysql',
    logging: true,

    define: {
        engine: 'InnoDB',
        timestamps: false,
    }
});


module.exports = {
    Sequelize,
    sequelize,
};
