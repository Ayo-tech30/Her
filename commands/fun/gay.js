export default {
    name: 'gay',
    description: 'Check gay percentage',
    execute: async (sock, msg, args, context) => {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const target = mentioned && mentioned[0] ? `@${mentioned[0].split('@')[0]}` : context.pushname;
        const percentage = Math.floor(Math.random() * 101);
        
        let status = '';
        if (percentage < 20) status = '🏳️ Straight';
        else if (percentage < 40) status = '🤔 Questioning';
        else if (percentage < 60) status = '💅 A bit fruity';
        else if (percentage < 80) status = '🌈 Pretty gay';
        else status = '🏳️‍🌈 SUPER GAY';

        await sock.sendMessage(context.from, { 
            text: `🏳️‍🌈 *GAY METER* 🏳️‍🌈\n\n${target} is ${percentage}% gay!\n\n${status}`,
            mentions: mentioned || []
        }, { quoted: msg });
    }
};
