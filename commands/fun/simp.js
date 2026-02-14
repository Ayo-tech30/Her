export default {
    name: 'simp',
    description: 'Check simp percentage',
    execute: async (sock, msg, args, context) => {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const target = mentioned && mentioned[0] ? `@${mentioned[0].split('@')[0]}` : context.pushname;
        const percentage = Math.floor(Math.random() * 101);
        
        let status = '';
        if (percentage < 20) status = '😎 Not a simp';
        else if (percentage < 40) status = '🙂 Slightly simping';
        else if (percentage < 60) status = '😳 Moderate simp';
        else if (percentage < 80) status = '🥺 Major simp';
        else status = '💸 ULTRA SIMP';

        await sock.sendMessage(context.from, { 
            text: `💸 *SIMP METER* 💸\n\n${target} is ${percentage}% simp!\n\n${status}`,
            mentions: mentioned || []
        }, { quoted: msg });
    }
};
