const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vehicle = sequelize.define("Vehicle", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDateTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  durationMins: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Vehicle;
