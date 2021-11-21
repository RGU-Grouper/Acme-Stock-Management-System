const { Sequelize } = require("sequelize");

// Init Database
const sequelize = new Sequelize('acme-stock', 'user', 'pass', {
	dialect: 'sqlite',
	host: './db/acme-atelier.sqlite',
	logging: false,
});

module.exports = sequelize;
