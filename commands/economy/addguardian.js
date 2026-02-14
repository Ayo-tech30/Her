import { db } from '../../index.js';

export default {
    name: 'addguardian',
    description: 'Add a guardian',
    ownerOnly: true,
    execute: async (sock, msg, args, context) => {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        
        if (!mentioned || mentioned.length === 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please mention a user to add as guardian!' 
            }, { quoted: msg });
        }

        const userId = mentioned[0].split('@')[0];
        const guardians = (await db.ref('guardians').once('value')).val() || [];

        if (guardians.includes(userId)) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ This user is already a guardian!' 
            }, { quoted: msg });
        }

        guardians.push(userId);
        await db.ref('guardians').set(guardians);

        await sock.sendMessage(context.from, { 
            text: `✅ Successfully added @${userId} as a guardian!`,
            mentions: [mentioned[0]]
        }, { quoted: msg });
    }
};
