const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class FabricTag extends Model {}

FabricTag.init({
	id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
	fabricId: { type: DataTypes.UUID },
	tagId: { type: DataTypes.UUID },
}, {
	sequelize,
	modelName: 'FabricTag',
});

module.exports = FabricTag;
