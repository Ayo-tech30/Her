export default {
    name: 'pp',
    description: 'Check pp size',
    execute: async (sock, msg, args, context) => {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const target = mentioned && mentioned[0] ? `@${mentioned[0].split('@')[0]}` : context.pushname;
        const size = Math.floor(Math.random() * 20) + 1;
        const pp = '8' + '='.repeat(size) + 'D';

        await sock.sendMessage(context.from, { 
            text: `🍆 *PP SIZE METER* 🍆\n\n${target}'s pp:\n${pp}\n\nSize: ${size}cm`,
            mentions: mentioned || []
        }, { quoted: msg });
    }
};
