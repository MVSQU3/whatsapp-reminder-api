import fs from 'fs';

// 📡 On repasse sur l'IP directe et le port 8081 qu'on a ouvert
const VPS_IP = "51.75.26.81"; 
const PORT_EVOLUTION = "8081";
const INSTANCE_NAME = "reminders-dev";

// ⚠️ REMPLACE CETTE VALEUR par ton mot de passe secret (AUTHENTICATION_API_KEY)
const API_KEY = "Rabid9-Finished7-Selective4-Canine3-Parking9-Overcoat6"; 

async function generateWhatsAppQR() {
  try {
    console.log(`🚀 Connexion directe au VPS sur le port ${PORT_EVOLUTION}...`);
    
    const response = await fetch(`http://${VPS_IP}:${PORT_EVOLUTION}/instance/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY
      },
      body: JSON.stringify({
        instanceName: INSTANCE_NAME,
        qrcode: true,
        integration: "WHATSAPP-BAILEYS"
      })
    });

    const rawText = await response.text();
    
    console.log("\n--------------------------------------------------");
    console.log(`📡 STATUT HTTP : ${response.status} ${response.statusText}`);
    console.log(`📝 RÉPONSE BRUTE DU SERVEUR : \n${rawText}`);
    console.log("--------------------------------------------------\n");

    if (rawText.trim().startsWith('{') || rawText.trim().startsWith('[')) {
      const data = JSON.parse(rawText);
      
      // Si l'API renvoie directement le QR code
      let qrBase64 = data.qrcode?.base64 || data.base64;
      
      if (qrBase64) {
        const imgSrc = qrBase64.startsWith('data:image') ? qrBase64 : `data:image/png;base64,${qrBase64}`;
        const htmlContent = `
          <html>
            <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background-color:#f0f2f5;">
              <div style="background:white;padding:30px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);text-align:center;">
                <h2 style="color:#128c7e;">🔗 Connecte ton SaaS à WhatsApp</h2>
                <p style="color:#555;">Ouvre WhatsApp sur ton téléphone > Appareils connectés > Connecter un appareil</p>
                <img src="${imgSrc}" width="300" height="300" style="margin-top:15px;border:1px solid #ddd;padding:10px;border-radius:8px;"/>
              </div>
            </body>
          </html>
        `;
        
        fs.writeFileSync('qrcode.html', htmlContent);
        console.log("✅ SUCCÈS ! Double-clique sur 'qrcode.html' pour scanner le QR Code !");
      } else {
        console.log("⚠️ L'API a répondu en JSON mais n'a pas renvoyé de QR Code (Peut-être déjà connecté ?).");
      }
    } else {
      console.log("⚠️ La réponse n'est pas du JSON.");
    }

  } catch (error) {
    console.error("❌ Impossible de joindre le serveur sur le port 8081 :", error);
  }
}

generateWhatsAppQR();