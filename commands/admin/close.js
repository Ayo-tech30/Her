export default {
    name: 'close',
    description: 'Close group (only admins can send messages)',
    adminOnly: true,
    groupOnly: true,
    execute: async (sock, msg, args, context) => {
        const groupMetadata = await sock.groupMetadata(context.from);
        const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const botParticipant = groupMetadata.participants.find(p => p.id === botNumber);

        if (!botParticipant || (botParticipant.admin !== 'admin' && botParticipant.admin !== 'superadmin')) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Bot needs to be an admin to change group settings!' 
            }, { quoted: msg });
        }

        try {
            await sock.groupSettingUpdate(context.from, 'announcement');
            await sock.sendMessage(context.from, { 
                text: '✅ Group closed! Only admins can send messages now.' 
            }, { quoted: msg });
        } catch (error) {
            await sock.sendMessage(context.from, { 
                text: `❌ Failed to close group: ${error.message}` 
            }, { quoted: msg });
        }
    }
};
