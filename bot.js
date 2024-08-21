// Importar las preguntas frecuentes desde faq.js
const faq = require("./data/faq");

// Importar otros módulos necesarios
const { Client, LocalAuth } = require("whatsapp-web.js");
const puppeteer = require("puppeteer-core");

// Definir el resto del código del bot
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath:
            "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        headless: false,
    },
});

client.on("message", (message) => {
    const text = message.body.toLowerCase();

    // Recorrer las palabras clave en faq.js para ver si alguna está presente en el mensaje
    for (const keyword in faq) {
        if (text.includes(keyword)) {
            message.reply(faq[keyword]);
            break; // Si encuentra una palabra clave, responde y termina el bucle
        }
    }
});

client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
});

client.on("ready", () => {
    console.log("Client is ready!");
});

client.initialize();
