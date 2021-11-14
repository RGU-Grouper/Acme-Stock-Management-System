const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Fabric extends Model {}

Fabric.init({
	id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
	name: { type: DataTypes.STRING },
	quantity: { type: DataTypes.NUMBER, defaultValue: 0 },
	image1: { type: DataTypes.STRING },
	image2: { type: DataTypes.STRING },
}, {
	sequelize,
	modelName: 'Fabric',
});

module.exports = Fabric;
