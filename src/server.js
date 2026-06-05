import 'dotenv/config'; // 👈 Cherche maintenant le fichier ".env" renommé
import express from 'express';
import sequelize from './database/connection.js';
import { createAppointment } from './controllers/appointmentController.js';
import { createUser } from './controllers/userController.js';
import { initCronJobs } from './services/cronService.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🔗 Nouvelle Route API pour enregistrer un rendez-vous
app.post('/api/users', createUser);               // 👈 Route pour créer un pro
app.post('/api/appointments', createAppointment);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de données synchronisée avec succès !', sequelize.getDatabaseName());
    initCronJobs();
    app.listen(PORT, () => {
      console.log(`🚀 Serveur actif sur le port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ Erreur lors de la synchro de la DB :', err))