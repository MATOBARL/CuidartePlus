const NodeClam = require("clamscan");
const { Readable } = require("stream");

const scanFileForViruses = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    console.log(`[ClamAV] Iniciando escaneo para: ${req.file.originalname} (${req.file.size} bytes)`);

    const clamscan = await new NodeClam().init({
      clamdscan: {
        host: process.env.CLAMAV_HOST || "clamav",
        port: 3310,
        timeout: 120000,
        localFallback: false,
      },
      preference: "clamdscan",
    });

    // Convertir el buffer en Stream para ClamAV
    const stream = new Readable();
    stream.push(req.file.buffer);
    stream.push(null); // Indica el fin del archivo/stream

    const result = await clamscan.scanStream(stream);
    console.log("[ClamAV] Resultado del escaneo:", result);

    if (result.isInfected) {
      console.warn(`[ClamAV] 🚨 VIRUS DETECTADO: ${result.viruses.join(", ")}`);
      return res.status(400).json({
        error: "Amenaza de seguridad detectada",
        glosa: `El archivo "${req.file.originalname}" fue rechazado por el antivirus (${result.viruses.join(", ")}).`,
      });
    }

    console.log("[ClamAV] ✅ Archivo limpio.");
    next();
  } catch (err) {
    console.error("[ClamAV Error]:", err);
    // Bloquear la subida si el servicio de antivirus falla por seguridad
    return res.status(500).json({
      error: "Error en el sistema de seguridad",
      glosa: `No se pudo escanear el archivo adjunto: ${err.message}`,
    });
  }
};

module.exports = scanFileForViruses;