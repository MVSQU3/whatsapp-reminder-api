import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  whatsappPhone: {
    type: DataTypes.STRING,
    allowNull: true // Le numéro qui enverra les messages de rappels
  }
});

export default User;