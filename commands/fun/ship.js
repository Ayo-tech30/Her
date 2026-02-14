export default {
    name: 'ship',
    description: 'Ship two people',
    execute: async (sock, msg, args, context) => {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        
        if (!mentioned || mentioned.length < 2) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please mention two people to ship!\nUsage: .ship @user1 @user2' 
            }, { quoted: msg });
        }

        const percentage = Math.floor(Math.random() * 101);
        const user1 = mentioned[0].split('@')[0];
        const user2 = mentioned[1].split('@')[0];
        
        let status = '';
        if (percentage < 30) status = '💔 Not meant to be...';
        else if (percentage < 60) status = '💛 Good chemistry!';
        else if (percentage < 80) status = '💚 Strong connection!';
        else status = '💖 Perfect match!';

        const text = `💕 *SHIP METER* 💕\n\n@${user1} 💘 @${user2}\n\n${percentage}% - ${status}`;

        await sock.sendMessage(context.from, { 
            text,
            mentions: mentioned
        }, { quoted: msg });
    }
};
