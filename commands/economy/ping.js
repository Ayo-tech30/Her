export default {
    name: 'ping',
    description: 'Check bot response time',
    execute: async (sock, msg, args, context) => {
        const start = Date.now();
        const sent = await sock.sendMessage(context.from, { text: '📡 Pinging...' }, { quoted: msg });
        const end = Date.now();
        
        await sock.sendMessage(context.from, { 
            text: `🏓 Pong!\n⚡ Response time: ${end - start}ms`,
            edit: sent.key
        });
    }
};
