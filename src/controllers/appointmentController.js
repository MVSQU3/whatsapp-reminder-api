import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

export const createAppointment = async (req, res) => {
  try {
    const { clientName, clientPhone, appointmentDate, userId } = req.body;

    // 1. Petite vérification de sécurité
    if (!clientName || !clientPhone || !appointmentDate || !userId) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires (clientName, clientPhone, appointmentDate, userId)." });
    }

    // 2. On vérifie si le professionnel (User) existe bel et bien dans la DB
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ error: "Le professionnel (userId) spécifié n'existe pas." });
    }

    // 3. Insertion du rendez-vous via Sequelize
    const newAppointment = await Appointment.create({
      clientName,
      clientPhone,
      appointmentDate, // Format attendu : "2026-06-05T15:30:00Z"
      userId
    });

    // 4. On renvoie une réponse positive
    return res.status(201).json({
      message: "🎉 Rendez-vous enregistré avec succès !",
      appointment: newAppointment
    });

  } catch (error) {
    console.error("❌ Erreur lors de la création du rendez-vous :", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};