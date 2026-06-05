import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';
import User from './User.js'; // On l'importe pour créer la relation

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clientPhone: {
    type: DataTypes.STRING,
    allowNull: false // Le WhatsApp du client qui va recevoir le rappel
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false // Date et heure du rendez-vous
  },
  status: {
    type: DataTypes.ENUM('pending', 'sent', 'failed'),
    defaultValue: 'pending'
  }
});

// 🔗 LA RELATION : Un professionnel (User) a plusieurs rendez-vous (Appointments)
User.hasMany(Appointment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

export default Appointment;