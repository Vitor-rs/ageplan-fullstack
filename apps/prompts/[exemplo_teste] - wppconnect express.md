# Código de conexão com o wppconnect

## Arquivo server.js

```javascript
// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");
const QRCode = require("qrcode");
const wppconnect = require("@wppconnect-team/wppconnect");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");

// Garantir que o diretório de dados exista e tenha permissões corretas
try {
    fs.ensureDirSync(DATA_DIR);
    fs.accessSync(DATA_DIR, fs.constants.W_OK);
    console.log(
        `Diretório de dados criado e com permissões corretas: ${DATA_DIR}`
    );
} catch (error) {
    console.error(`Erro ao configurar diretório de dados: ${error.message}`);
    console.error(`Verifique se o caminho ${DATA_DIR} tem permissões de escrita`);
}

// Configurar middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Variáveis para armazenar a sessão e o QR Code
let client = null;
let qrCodeBase64 = "";
let isConnected = false;
let browser = null;

// Rota para a página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota para obter o QR Code como base64
app.get("/qrcode", (req, res) => {
    res.json({qrcode: qrCodeBase64, connected: isConnected});
});

// Função para lidar com o fechamento do navegador
function handleBrowserClose() {
    console.log("Navegador foi fechado. Desconectando sessão...");
    isConnected = false;
    client = null;
    browser = null;
}

// Rota para iniciar a sessão do WhatsApp
app.post("/start-session", async (req, res) => {
    if (client) {
        return res.json({status: "already_started", connected: isConnected});
    }

    // Enviar resposta imediatamente para evitar o erro de cabeçalhos já enviados
    res.json({status: "starting"});

    try {
        // Iniciar o cliente WPPConnect
        wppconnect
            .create({
                session: "whatsapp-data-collector",
                catchQR: (base64Qr, asciiQR, attempt, urlCode) => {
                    // Converter o QR Code para uma imagem base64
                    QRCode.toDataURL(urlCode, (err, url) => {
                        if (err) {
                            console.error("Erro ao gerar QR Code:", err);
                            return;
                        }
                        qrCodeBase64 = url;
                    });

                    console.log(
                        "QR Code gerado. Escaneie com seu telefone para continuar."
                    );
                },
                statusFind: (statusSession, session) => {
                    console.log("Status da sessão:", statusSession);
                    // Atualizar status de conexão
                    if (statusSession === "inChat" || statusSession === "isLogged") {
                        isConnected = true;
                    } else if (
                        statusSession === "browserClose" ||
                        statusSession === "desconnectedMobile"
                    ) {
                        console.log("Sessão do WhatsApp foi desconectada.");
                        isConnected = false;
                        client = null;
                        browser = null;
                    }
                },
                folderNameToken: "./tokens", // Local onde os tokens serão salvos
                headless: false, // Usar o modo visível do navegador
                useChrome: true,
                debug: false,
                logQR: true,
                disableWelcome: true,
                updatesLog: true,
                autoClose: 0, // Nunca fechar automaticamente
                waitForLogin: true, // Aguarda o login
                browserArgs: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-accelerated-2d-canvas",
                ],
                puppeteerOptions: {
                    // Opções específicas do Puppeteer para mais estabilidade
                    userDataDir: path.join(__dirname, "browser-data"),
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                },
            })
            .then(async (wppClient) => {
                client = wppClient;
                isConnected = true;

                // Armazenar referência ao navegador para detectar fechamento
                browser = client.page.browser();

                // Adicionar evento para detectar quando o navegador fecha
                browser.on("disconnected", handleBrowserClose);

                // Configurar idioma para português do Brasil - múltiplas técnicas
                await client.page.setExtraHTTPHeaders({
                    "Accept-Language": "pt-BR,pt;q=0.9",
                });

                // Definir configurações no localStorage
                await client.page.evaluate(() => {
                    localStorage.setItem("WALangPref", "pt-BR");
                    localStorage.setItem("WAWebLocale", "pt-BR");

                    // Também configurar cookies
                    document.cookie =
                        "wa_lang_pref=pt-BR; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";

                    // Forçar recarga
                    window.location.reload();
                });

                // Esperar página recarregar e carregar completamente
                await Promise.race([
                    client.page.waitForNavigation({
                        waitUntil: "networkidle0",
                        timeout: 30000,
                    }),
                    new Promise((resolve) => setTimeout(resolve, 15000)), // Timeout de segurança
                ]).catch((e) => {
                    console.log("Navegação concluída após alteração de idioma");
                });

                // Verificar se o idioma foi aplicado
                const language = await client.page.evaluate(() => {
                    return localStorage.getItem("WALangPref") || "não definido";
                });
                console.log(`Idioma atual do WhatsApp Web: ${language}`);

                // Configurar evento para receber todas as mensagens
                client.onMessage((message) => {
                    console.log("Mensagem recebida:", message.body);
                    saveMessage(message);
                });

                // Configurar evento para receber atualizações de presença
                client.onPresenceChanged((presenceEvent) => {
                    console.log("Alteração de presença:", presenceEvent);
                    savePresence(presenceEvent);
                });

                // Usar onAck em vez de onMessageStatusChange
                client.onAck((statusEvent) => {
                    console.log("Status da mensagem alterado:", statusEvent);
                    saveMessageStatus(statusEvent);
                });

                console.log("Cliente WPPConnect iniciado com sucesso!");

                // Desativar o recurso de auto-minimização do WhatsApp Web
                await client.page.evaluate(() => {
                    localStorage.setItem("WAWebMinimized", "false");
                });
            })
            .catch((error) => {
                console.error("Erro ao iniciar cliente WPPConnect:", error);
                isConnected = false;
                client = null;
            });
    } catch (error) {
        console.error("Erro ao iniciar a sessão:", error);
        isConnected = false;
        client = null;
    }
});

// Função para salvar mensagens em JSON
function saveMessage(message) {
    try {
        const messagesPath = path.join(DATA_DIR, "messages.json");
        console.log(`Salvando mensagem em: ${messagesPath}`);

        let messages = [];

        // Ler arquivo existente se disponível
        if (fs.existsSync(messagesPath)) {
            messages = fs.readJsonSync(messagesPath, {throws: false}) || [];
            console.log(
                `Arquivo existente lido, contém ${messages.length} mensagens`
            );
        }

        // Adicionar nova mensagem
        messages.push({
            ...message,
            timestamp: Date.now(),
        });

        // Salvar de volta no arquivo
        fs.writeJsonSync(messagesPath, messages, {spaces: 2});
        console.log(
            `Mensagem salva com sucesso. Total: ${messages.length} mensagens`
        );
    } catch (error) {
        console.error(`Erro ao salvar mensagem: ${error.message}`);
    }
}

// Função para salvar dados de presença
function savePresence(presenceData) {
    try {
        const presencePath = path.join(DATA_DIR, "presence.json");
        console.log(`Salvando dado de presença em: ${presencePath}`);

        let presenceRecords = [];

        if (fs.existsSync(presencePath)) {
            presenceRecords = fs.readJsonSync(presencePath, {throws: false}) || [];
            console.log(
                `Arquivo existente lido, contém ${presenceRecords.length} registros`
            );
        }

        presenceRecords.push({
            ...presenceData,
            timestamp: Date.now(),
        });

        fs.writeJsonSync(presencePath, presenceRecords, {spaces: 2});
        console.log(
            `Dado de presença salvo com sucesso. Total: ${presenceRecords.length} registros`
        );
    } catch (error) {
        console.error(`Erro ao salvar dado de presença: ${error.message}`);
    }
}

// Função para salvar status de mensagens
function saveMessageStatus(statusData) {
    try {
        const statusPath = path.join(DATA_DIR, "message_status.json");
        console.log(`Salvando status de mensagem em: ${statusPath}`);

        let statusRecords = [];

        if (fs.existsSync(statusPath)) {
            statusRecords = fs.readJsonSync(statusPath, {throws: false}) || [];
            console.log(
                `Arquivo existente lido, contém ${statusRecords.length} registros`
            );
        }

        statusRecords.push({
            ...statusData,
            timestamp: Date.now(),
        });

        fs.writeJsonSync(statusPath, statusRecords, {spaces: 2});
        console.log(
            `Status de mensagem salvo com sucesso. Total: ${statusRecords.length} registros`
        );
    } catch (error) {
        console.error(`Erro ao salvar status de mensagem: ${error.message}`);
    }
}

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Acesse http://localhost:${PORT} para escanear o QR Code`);
});
```

## Arquivo index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsApp Data Collector</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .qrcode-container {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            text-align: center;
        }

        .qrcode-image {
            max-width: 300px;
            margin-bottom: 15px;
        }

        .status {
            margin-top: 20px;
            padding: 10px;
            border-radius: 4px;
        }

        .connected {
            background-color: #d4edda;
            color: #155724;
        }

        .disconnected {
            background-color: #f8d7da;
            color: #721c24;
        }

        button {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: #45a049;
        }

        button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
    </style>
</head>

<body>
<div class="container">
    <h1>WhatsApp Data Collector</h1>
    <p>Escaneie o QR Code abaixo para conectar sua conta do WhatsApp:</p>

    <button id="startBtn">Iniciar Sessão do WhatsApp</button>

    <div class="qrcode-container">
        <img id="qrcode" class="qrcode-image" src="" alt="QR Code do WhatsApp" style="display: none;">
        <p id="qrcodeStatus">Clique em "Iniciar Sessão" para gerar o QR Code.</p>
    </div>

    <div id="status" class="status disconnected">
        Status: Desconectado
    </div>
</div>

<script>
    const startBtn = document.getElementById('startBtn');
    const qrcodeImg = document.getElementById('qrcode');
    const qrcodeStatus = document.getElementById('qrcodeStatus');
    const statusDiv = document.getElementById('status');

    let checkQrInterval;

    startBtn.addEventListener('click', async () => {
        startBtn.disabled = true;
        qrcodeStatus.textContent = 'Iniciando sessão...';

        try {
            const response = await fetch('/start-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (data.status === 'starting' || data.status === 'already_started') {
                qrcodeStatus.textContent = 'Aguardando QR Code...';

                // Verificar o QR Code a cada 2 segundos
                checkQrInterval = setInterval(checkQrCode, 2000);
            } else {
                qrcodeStatus.textContent = 'Erro ao iniciar sessão. Tente novamente.';
                startBtn.disabled = false;
            }
        } catch (error) {
            console.error('Erro:', error);
            qrcodeStatus.textContent = 'Erro ao iniciar sessão. Tente novamente.';
            startBtn.disabled = false;
        }
    });

    async function checkQrCode() {
        try {
            const response = await fetch('/qrcode');
            const data = await response.json();

            if (data.connected) {
                // Usuário está conectado
                clearInterval(checkQrInterval);
                qrcodeImg.style.display = 'none';
                qrcodeStatus.textContent = 'Conectado com sucesso!';
                statusDiv.textContent = 'Status: Conectado';
                statusDiv.classList.remove('disconnected');
                statusDiv.classList.add('connected');
                startBtn.disabled = true;
            } else if (data.qrcode) {
                // Exibir QR Code
                qrcodeImg.src = data.qrcode;
                qrcodeImg.style.display = 'block';
                qrcodeStatus.textContent = 'Escaneie o QR Code com seu WhatsApp';
            }
        } catch (error) {
            console.error('Erro ao buscar QR Code:', error);
        }
    }
</script>
</body>

</html>
```

## Arquivo mongo-integration.js

```javascript
// mongodb-integration.js
const mongoose = require("mongoose");

// Esquema para mensagens
const messageSchema = new mongoose.Schema(
    {
        id: String,
        body: String,
        type: String,
        fromMe: Boolean,
        author: String,
        time: Date,
        chatId: String,
        messageId: String,
        // Outros campos relevantes
    },
    {timestamps: true}
);

// Esquema para presença
const presenceSchema = new mongoose.Schema(
    {
        id: String,
        isOnline: Boolean,
        isTyping: Boolean,
        chatId: String,
        // Outros campos relevantes
    },
    {timestamps: true}
);

// Esquema para status de mensagens
const messageStatusSchema = new mongoose.Schema(
    {
        id: String,
        status: String,
        messageId: String,
        // Outros campos relevantes
    },
    {timestamps: true}
);

// Criar modelos
const Message = mongoose.model("Message", messageSchema);
const Presence = mongoose.model("Presence", presenceSchema);
const MessageStatus = mongoose.model("MessageStatus", messageStatusSchema);

// Função para conectar ao MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/whatsapp-data", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado ao MongoDB com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
    }
}

// Funções para salvar dados no MongoDB
async function saveMessageToMongoDB(message) {
    try {
        const newMessage = new Message({
            id: message.id,
            body: message.body,
            type: message.type,
            fromMe: message.fromMe,
            author: message.author,
            time: new Date(message.timestamp),
            chatId: message.chatId,
            messageId: message.id,
        });

        await newMessage.save();
        console.log("Mensagem salva no MongoDB");
    } catch (error) {
        console.error("Erro ao salvar mensagem no MongoDB:", error);
    }
}

// Adicione outras funções para salvar presença e status...

module.exports = {
    connectToDatabase,
    saveMessageToMongoDB,
    Message,
    Presence,
    MessageStatus,
};
```

## Arquivo package.json

```json
{
  "name": "whatsapp-data-collector",
  "version": "1.0.0",
  "description": "Aplicação para coletar dados do WhatsApp Web",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "whatsapp",
    "wppconnect",
    "data-collection"
  ],
  "author": "Vitor Santos",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "@wppconnect-team/wppconnect": "^1.36.1",
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "fs-extra": "^11.3.0",
    "puppeteer": "^24.4.0",
    "qrcode": "^1.5.4"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
```

## Arquivo nodemon.json

```json
{
  "ignore": [
    "data/*",
    "*.json",
    "tokens/*",
    "browser-data/*"
  ],
  "watch": [
    "server.js",
    "public/*",
    "*.js"
  ],
  "ext": "js,mjs,cjs"
}
```
