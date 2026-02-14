export default {
    name: 'ttk',
    description: 'Download ttk media',
    execute: async (sock, msg, args, context) => {
        await sock.sendMessage(context.from, { 
            text: '⚠️ This feature is under development!' 
        }, { quoted: msg });
    }
};
