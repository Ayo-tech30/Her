export default {
    name: 'lesbian',
    description: 'lesbian command',
    execute: async (sock, msg, args, context) => {
        const percentage = Math.floor(Math.random() * 101);
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const target = mentioned && mentioned[0] ? `@${mentioned[0].split('@')[0]}` : context.pushname;
        
        await sock.sendMessage(context.from, { 
            text: `${target} is ${percentage}% lesbian!`,
            mentions: mentioned || []
        }, { quoted: msg });
    }
};
