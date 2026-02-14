export default {
    name: 'open',
    description: 'Open group (allow all to send messages)',
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
            await sock.groupSettingUpdate(context.from, 'not_announcement');
            await sock.sendMessage(context.from, { 
                text: '✅ Group opened! All members can now send messages.' 
            }, { quoted: msg });
        } catch (error) {
            await sock.sendMessage(context.from, { 
                text: `❌ Failed to open group: ${error.message}` 
            }, { quoted: msg });
        }
    }
};
