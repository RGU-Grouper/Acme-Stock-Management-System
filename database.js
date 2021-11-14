const { Sequelize } = require("sequelize");

// Init Database
const sequelize = new Sequelize('acme-stock', 'user', 'pass', {
	dialect: 'sqlite',
	host: './acme-stock.sqlite',
});

module.exports = sequelize;
