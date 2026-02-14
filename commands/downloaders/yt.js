export default {
    name: 'yt',
    description: 'Download yt media',
    execute: async (sock, msg, args, context) => {
        await sock.sendMessage(context.from, { 
            text: '⚠️ This feature is under development!' 
        }, { quoted: msg });
    }
};
