export default {
    name: 'play',
    description: 'Download play media',
    execute: async (sock, msg, args, context) => {
        await sock.sendMessage(context.from, { 
            text: '⚠️ This feature is under development!' 
        }, { quoted: msg });
    }
};
