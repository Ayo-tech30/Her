export default {
    name: 'promote',
    description: 'Promote a member to admin',
    adminOnly: true,
    groupOnly: true,
    execute: async (sock, msg, args, context) => {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        
        if (!mentioned || mentioned.length === 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please mention user(s) to promote!' 
            }, { quoted: msg });
        }

        const groupMetadata = await sock.groupMetadata(context.from);
        const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const botParticipant = groupMetadata.participants.find(p => p.id === botNumber);

        if (!botParticipant || (botParticipant.admin !== 'admin' && botParticipant.admin !== 'superadmin')) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Bot needs to be an admin to promote members!' 
            }, { quoted: msg });
        }

        try {
            await sock.groupParticipantsUpdate(context.from, mentioned, 'promote');
            await sock.sendMessage(context.from, { 
                text: `✅ Successfully promoted ${mentioned.length} member(s) to admin!` 
            }, { quoted: msg });
        } catch (error) {
            await sock.sendMessage(context.from, { 
                text: `❌ Failed to promote: ${error.message}` 
            }, { quoted: msg });
        }
    }
};
