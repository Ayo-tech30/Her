export default {
    name: 'gpt',
    description: 'AI gpt command',
    execute: async (sock, msg, args, context) => {
        await sock.sendMessage(context.from, { 
            text: '⚠️ This feature is under development!\n\nTo implement this feature, integrate with an AI API service.' 
        }, { quoted: msg });
    }
};
