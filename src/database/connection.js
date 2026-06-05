import { Sequelize } from 'sequelize';

// On récupère l'URL de la base de données
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.log("⚠️ DATABASE_URL n'est pas définie dans le .env, bascule sur le localhost local.");
}

const sequelize = dbUrl
  ? new Sequelize(dbUrl, {
      dialect: 'postgres',
      logging: false,
      /* 💡 Note de sécurité : Si tu obtiens une erreur de connexion ou une erreur "SSL handshake failed",
         décommente les lignes ci-dessous (en enlevant les /*) ou supprime-les. 
         Coolify n'impose pas toujours le SSL sur son port public par défaut.
      */
      /*
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      */
    })
  : new Sequelize('postgres://postgres:postgres@localhost:5432/db-reminders-dev', {
      dialect: 'postgres',
      logging: false,
    });

// Test de la connexion
sequelize.authenticate()
  .then(async () => console.log('✅ Sequelize est connecté à PostgreSQL ! Base actuelle :', await sequelize.getDatabaseName()))
  .catch(err => console.error('❌ Impossible de se connecter à la DB avec Sequelize :', err));

export default sequelize;