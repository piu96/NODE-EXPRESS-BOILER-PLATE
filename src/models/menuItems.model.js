const { Model, DataTypes } = require('sequelize');
const sequelize = require('../DB/db.connection'); 
const Menu = require("./menus.model");
const Page = require("./pages.model");

class MenuItem extends Model {}

MenuItem.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        menu_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: Menu, 
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: -1, // Default value is -1
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // Default value is 0
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: true, // Slug can be null
        },
        target_set: {
            type: DataTypes.STRING(255),
            allowNull: true, // Target can be null
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1, // Default status is 1 (active)
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
        modelName: "MenuItem",
        tableName: "menus_items",
        timestamps: true,
        paranoid: true, // Enables soft deletes (deleted_at column)
        underscored: true, // Uses snake_case for column names
    }
);

// Define Association
Menu.hasMany(MenuItem, { foreignKey: "menu_id", as: "items" });
MenuItem.belongsTo(Menu, { foreignKey: "menu_id", as: "menu" });
MenuItem.belongsTo(Page, { foreignKey: "slug", targetKey: "id", as: "slugData" });


module.exports = MenuItem;