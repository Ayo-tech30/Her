export default {
    name: 'skill',
    description: 'skill command',
    execute: async (sock, msg, args, context) => {
        const percentage = Math.floor(Math.random() * 101);
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const target = mentioned && mentioned[0] ? `@${mentioned[0].split('@')[0]}` : context.pushname;
        
        await sock.sendMessage(context.from, { 
            text: `${target} is ${percentage}% skill!`,
            mentions: mentioned || []
        }, { quoted: msg });
    }
};
