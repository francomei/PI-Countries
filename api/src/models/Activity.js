const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("activity", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        dificulty: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
            allowNull: true,
        },
        duration: { 
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        season: {
            type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
            allowNull: true,
        }
    })
}