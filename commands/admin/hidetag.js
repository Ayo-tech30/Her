export default {
    name: 'hidetag',
    description: 'Send message with hidden tags',
    adminOnly: true,
    groupOnly: true,
    execute: async (sock, msg, args, context) => {
        if (args.length === 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please provide a message!\nUsage: .hidetag <message>' 
            }, { quoted: msg });
        }

        const groupMetadata = await sock.groupMetadata(context.from);
        const participants = groupMetadata.participants.map(p => p.id);
        const message = args.join(' ');

        await sock.sendMessage(context.from, { 
            text: message,
            mentions: participants
        });
    }
};
