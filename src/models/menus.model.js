const { Model, DataTypes } = require('sequelize');
const sequelize = require('../DB/db.connection'); 
class Menu extends Model {}

Menu.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        menu_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1, 
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: "Menu",
        tableName: "menus",
        timestamps: true,
        paranoid: true, 
        underscored: true, 
    }
);

module.exports = Menu;