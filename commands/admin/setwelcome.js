import { db } from '../../index.js';

export default {
    name: 'setwelcome',
    description: 'Set welcome message',
    adminOnly: true,
    groupOnly: true,
    execute: async (sock, msg, args, context) => {
        if (args.length === 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please provide a welcome message!\nUsage: .setwelcome <message>\nUse {user} to mention the new member' 
            }, { quoted: msg });
        }

        const message = args.join(' ');
        await db.ref(`groups/${context.from}/settings/welcomeMessage`).set(message);

        await sock.sendMessage(context.from, { 
            text: `✅ Welcome message set to:\n\n${message}` 
        }, { quoted: msg });
    }
};
