export default {
    name: 'dm',
    description: 'Self demote from admin',
    modOnly: true,
    groupOnly: true,
    execute: async (sock, msg, args, context) => {
        const groupMetadata = await sock.groupMetadata(context.from);
        const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const botParticipant = groupMetadata.participants.find(p => p.id === botNumber);

        if (!botParticipant || (botParticipant.admin !== 'admin' && botParticipant.admin !== 'superadmin')) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Bot needs to be an admin to demote users!' 
            }, { quoted: msg });
        }

        try {
            await sock.groupParticipantsUpdate(context.from, [context.sender], 'demote');
            await sock.sendMessage(context.from, { 
                text: `✅ @${context.userId} has been demoted to member!`,
                mentions: [context.sender]
            }, { quoted: msg });
        } catch (error) {
            await sock.sendMessage(context.from, { 
                text: `❌ Failed to demote: ${error.message}` 
            }, { quoted: msg });
        }
    }
};
