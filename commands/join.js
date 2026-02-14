export default {
    name: 'join',
    description: 'Make bot join a group',
    modOnly: true,
    execute: async (sock, msg, args, context) => {
        if (!args[0]) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please provide a group invite link!\nUsage: .join <group_link>' 
            }, { quoted: msg });
        }

        const url = args[0];
        const code = url.split('/').pop();

        try {
            const result = await sock.groupAcceptInvite(code);
            await sock.sendMessage(context.from, { 
                text: `✅ Successfully joined the group!` 
            }, { quoted: msg });
        } catch (error) {
            await sock.sendMessage(context.from, { 
                text: `❌ Failed to join group: ${error.message}` 
            }, { quoted: msg });
        }
    }
};
