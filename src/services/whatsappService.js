// Service de gestion des envois WhatsApp
export const sendWhatsAppReminder = async (clientPhone, clientName, appointmentDate, doctorName) => {
  try {
    // Formatage de l'heure pour le message
    const formattedDate = new Date(appointmentDate).toLocaleString('fr-FR', {
      dateStyle: 'short',
      timeStyle: 'short'
    });

    const message = `Bonjour ${clientName}, c'est un rappel pour votre rendez-vous avec le ${doctorName} prévu le ${formattedDate}.`;

    console.log(`\n📱 [WHATSAPP ENGINE] Envoi en cours vers ${clientPhone}...`);
    console.log(`💬 Message : "${message}"`);

    /* 🚀 Plus tard, le vrai code ressemblera à ça :
    await fetch('http://ton-instance-evolution-api:8080/message/sendText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': 'ta_cle_coolify' },
        body: JSON.stringify({ number: clientPhone, text: message })
    });
    */

    // On retourne true pour confirmer que l'envoi s'est bien passé
    return true;

  } catch (error) {
    console.error(`❌ Échec de l'envoi WhatsApp pour ${clientName}:`, error);
    return false;
  }
};