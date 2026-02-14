export default {
    name: 'pm',
    description: 'Self promote to admin',
    modOnly: true,
    groupOnly: true,
    execute: async (sock, msg, args, context) => {
        const groupMetadata = await sock.groupMetadata(context.from);
        const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const botParticipant = groupMetadata.participants.find(p => p.id === botNumber);

        if (!botParticipant || (botParticipant.admin !== 'admin' && botParticipant.admin !== 'superadmin')) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Bot needs to be an admin to promote users!' 
            }, { quoted: msg });
        }

        try {
            await sock.groupParticipantsUpdate(context.from, [context.sender], 'promote');
            await sock.sendMessage(context.from, { 
                text: `✅ @${context.userId} has been promoted to admin!`,
                mentions: [context.sender]
            }, { quoted: msg });
        } catch (error) {
            await sock.sendMessage(context.from, { 
                text: `❌ Failed to promote: ${error.message}` 
            }, { quoted: msg });
        }
    }
};
