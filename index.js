import makeWASocket, { 
    DisconnectReason, 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import chalk from 'chalk';
import figlet from 'figlet';
import readline from 'readline';
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import fs from 'fs';
import { handleMessage } from './handlers/messageHandler.js';
import { loadCommands } from './handlers/commandLoader.js';

// Firebase Configuration
const serviceAccount = JSON.parse(fs.readFileSync('./firebase-config.json', 'utf8'));

initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL || serviceAccount.databaseURL
});

export const db = getDatabase();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

// Store processed messages to prevent duplicate responses
const processedMessages = new Set();
let botStartTime = Date.now();

console.log(chalk.cyan(figlet.textSync('NEXORA BOT', { horizontalLayout: 'full' })));
console.log(chalk.green('━'.repeat(50)));
console.log(chalk.yellow('Creator: KYNX'));
console.log(chalk.yellow('Version: 1.0.0'));
console.log(chalk.green('━'.repeat(50)));

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.ubuntu('Nexora'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
        },
        getMessage: async (key) => {
            return { conversation: '' };
        }
    });

    // Load all commands
    await loadCommands();

    // Pairing code if not authenticated
    if (!sock.authState.creds.registered) {
        const phoneNumber = await question(chalk.cyan('Enter your WhatsApp number (with country code, e.g., 2349049460676): '));
        const code = await sock.requestPairingCode(phoneNumber.trim());
        console.log(chalk.green(`Your Pairing Code: ${code}`));
    }

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)
                ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
                : true;

            console.log(chalk.red('Connection closed. Reconnecting:', shouldReconnect));

            if (shouldReconnect) {
                // Reset bot start time on reconnection
                botStartTime = Date.now();
                processedMessages.clear();
                startBot();
            }
        } else if (connection === 'open') {
            console.log(chalk.green('✓ Connected to WhatsApp!'));
            console.log(chalk.cyan('Bot is ready to receive commands...'));
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        try {
            if (type !== 'notify') return;

            const msg = messages[0];
            if (!msg.message) return;

            // Get message timestamp
            const messageTime = msg.messageTimestamp * 1000;
            
            // Ignore messages from before bot started
            if (messageTime < botStartTime) {
                return;
            }

            // Check if message already processed
            const messageId = msg.key.id;
            if (processedMessages.has(messageId)) {
                return;
            }

            // Add to processed set
            processedMessages.add(messageId);

            // Clean up old processed messages (keep last 1000)
            if (processedMessages.size > 1000) {
                const toDelete = Array.from(processedMessages).slice(0, 500);
                toDelete.forEach(id => processedMessages.delete(id));
            }

            // Handle the message
            await handleMessage(sock, msg);
        } catch (error) {
            console.error(chalk.red('Error handling message:'), error);
        }
    });

    // Handle group participant updates
    sock.ev.on('group-participants.update', async (update) => {
        try {
            const { id, participants, action } = update;
            
            // Get group metadata
            const metadata = await sock.groupMetadata(id);
            
            // Check welcome/leave settings
            const groupSettings = (await db.ref(`groups/${id}/settings`).once('value')).val() || {};
            
            if (action === 'add' && groupSettings.welcome) {
                const welcomeMsg = groupSettings.welcomeMessage || `Welcome to ${metadata.subject}! 🎉`;
                
                for (let participant of participants) {
                    await sock.sendMessage(id, {
                        text: welcomeMsg.replace('{user}', `@${participant.split('@')[0]}`),
                        mentions: [participant]
                    });
                }
            } else if (action === 'remove' && groupSettings.leave) {
                const leaveMsg = groupSettings.leaveMessage || `Goodbye! 👋`;
                
                for (let participant of participants) {
                    await sock.sendMessage(id, {
                        text: leaveMsg.replace('{user}', `@${participant.split('@')[0]}`),
                        mentions: [participant]
                    });
                }
            }
        } catch (error) {
            console.error(chalk.red('Error handling group update:'), error);
        }
    });

    return sock;
}

startBot();
