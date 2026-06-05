import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, whatsappPhone } = req.body;

    // Validation de base
    if (!name || !email) {
      return res.status(400).json({ error: "Le nom et l'email sont obligatoires." });
    }

    // Vérifier si l'email existe déjà
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ error: "Un professionnel avec cet email existe déjà." });
    }

    // Création de l'utilisateur dans PostgreSQL via Sequelize
    const newUser = await User.create({
      name,
      email,
      whatsappPhone
    });

    return res.status(201).json({
      message: "👤 Professionnel créé avec succès !",
      user: newUser
    });

  } catch (error) {
    console.error("❌ Erreur lors de la création de l'utilisateur :", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};