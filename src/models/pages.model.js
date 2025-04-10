const { Model, DataTypes } = require('sequelize');
const sequelize = require('../DB/db.connection'); 

class Page extends Model {}

Page.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Title cannot be empty' },
            },
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: { msg: 'Slug cannot be empty' },
            },
        },
        meta_title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        meta_author: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        meta_description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        meta_keywords: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        meta_feature_image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        data: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        template: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        status: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 1,
            comment: '1=Active, 0=Inactive',
        },
        is_default: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '1=System Default',
        },
    },
    {
        sequelize,
        modelName: 'Page',
        tableName: 'pages',
        timestamps: true, // Enables created_at & updated_at
        paranoid: true, // Enables soft delete (deleted_at)
        underscored: true, // Ensures all column names are snake_case
    }
);

module.exports = Page;
