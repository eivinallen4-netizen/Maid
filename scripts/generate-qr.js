import os from "os";
import QRCode from "qrcode";

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

async function generateQR() {
  const localIP = getLocalIP();
  const url = `http://${localIP}:3000`;

  console.log("\n╔════════════════════════════════════════════╗");
  console.log("║         🚀 DEV SERVER STARTING...          ║");
  console.log("╚════════════════════════════════════════════╝\n");
  console.log(`📱 Local IP URL: ${url}\n`);

  try {
    const qrCode = await QRCode.toString(url, {
      type: "terminal",
      width: 10,
    });
    console.log("Scan with your phone:\n");
    console.log(qrCode);
    console.log(`\nOR visit: http://localhost:3000 (desktop)\n`);
  } catch (error) {
    console.error("Error generating QR code:", error);
    console.log(`Visit: ${url}\n`);
  }
}

generateQR();
