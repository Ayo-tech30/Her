export default {
    name: 'leave',
    description: 'Make bot leave a group',
    modOnly: true,
    groupOnly: true,
    execute: async (sock, msg, args, context) => {
        await sock.sendMessage(context.from, { 
            text: '👋 Goodbye! Bot is leaving this group...' 
        }, { quoted: msg });

        setTimeout(async () => {
            await sock.groupLeave(context.from);
        }, 2000);
    }
};
