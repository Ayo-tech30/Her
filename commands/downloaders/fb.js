export default {
    name: 'fb',
    description: 'Download fb media',
    execute: async (sock, msg, args, context) => {
        await sock.sendMessage(context.from, { 
            text: '⚠️ This feature is under development!' 
        }, { quoted: msg });
    }
};
