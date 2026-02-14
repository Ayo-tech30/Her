import { db } from '../../index.js';

export default {
    name: 'addmod',
    description: 'Add a moderator',
    ownerOnly: true,
    execute: async (sock, msg, args, context) => {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        
        if (!mentioned || mentioned.length === 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please mention a user to add as moderator!' 
            }, { quoted: msg });
        }

        const userId = mentioned[0].split('@')[0];
        const mods = (await db.ref('mods').once('value')).val() || [];

        if (mods.includes(userId)) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ This user is already a moderator!' 
            }, { quoted: msg });
        }

        mods.push(userId);
        await db.ref('mods').set(mods);

        await sock.sendMessage(context.from, { 
            text: `✅ Successfully added @${userId} as a moderator!`,
            mentions: [mentioned[0]]
        }, { quoted: msg });
    }
};
