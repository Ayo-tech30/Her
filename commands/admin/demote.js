export default {
    name: 'demote',
    description: 'Demote an admin to member',
    adminOnly: true,
    groupOnly: true,
    execute: async (sock, msg, args, context) => {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        
        if (!mentioned || mentioned.length === 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please mention user(s) to demote!' 
            }, { quoted: msg });
        }

        const groupMetadata = await sock.groupMetadata(context.from);
        const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const botParticipant = groupMetadata.participants.find(p => p.id === botNumber);

        if (!botParticipant || (botParticipant.admin !== 'admin' && botParticipant.admin !== 'superadmin')) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Bot needs to be an admin to demote members!' 
            }, { quoted: msg });
        }

        try {
            await sock.groupParticipantsUpdate(context.from, mentioned, 'demote');
            await sock.sendMessage(context.from, { 
                text: `✅ Successfully demoted ${mentioned.length} admin(s) to member!` 
            }, { quoted: msg });
        } catch (error) {
            await sock.sendMessage(context.from, { 
                text: `❌ Failed to demote: ${error.message}` 
            }, { quoted: msg });
        }
    }
};
