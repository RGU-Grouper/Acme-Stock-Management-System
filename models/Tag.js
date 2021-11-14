const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Tag extends Model {}

Tag.init({
	id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
	name: { type: DataTypes.STRING, allowNull: false },
	category: { type: DataTypes.STRING, allowNull: false },
}, {
	sequelize,
	modelName: 'Tag',
});

module.exports = Tag;
