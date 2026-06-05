import cron from 'node-cron';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import { sendWhatsAppReminder } from './whatsappService.js';

export const initCronJobs = () => {
  // 🕒 Exécution toutes les minutes : '* * * * *'
  cron.schedule('* * * * *', async () => {
    console.log('🔍 [CRON] Vérification des rendez-vous à rappeler...');

    try {
      // On cherche les rendez-vous "pending" (on peut filtrer par date plus tard)
      const appointmentsToRemind = await Appointment.findAll({
        where: { status: 'pending' },
        include: [{ model: User }] // Permet de récupérer les infos du docteur lié
      });

      if (appointmentsToRemind.length === 0) {
        console.log('💡 [CRON] Aucun rappel en attente pour le moment.');
        return;
      }

      console.log(`🎯 [CRON] ${appointmentsToRemind.length} rappel(s) trouvé(s).`);

      // On traite chaque rendez-vous trouvé
      for (const appointment of appointmentsToRemind) {
        const isSent = await sendWhatsAppReminder(
          appointment.clientPhone,
          appointment.clientName,
          appointment.appointmentDate,
          appointment.User.name // Le nom du docteur grâce à l'include
        );

        if (isSent) {
          // On passe le statut à 'sent' dans PostgreSQL
          appointment.status = 'sent';
          await appointment.save();
          console.log(`✅ [CRON] Rendez-vous de ${appointment.clientName} marqué comme envoyé.`);
        } else {
          appointment.status = 'failed';
          await appointment.save();
        }
      }

    } catch (error) {
      console.error('❌ Erreur lors de l\'exécution du Cron de rappel :', error);
    }
  });
};