import { db } from '../../index.js';
import { formatNumber } from '../../utils/formatter.js';

export default {
    name: 'slots',
    description: 'Play slots',
    execute: async (sock, msg, args, context) => {
        const bet = parseInt(args[0]);

        if (!bet || isNaN(bet) || bet <= 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please specify a valid bet amount!\nUsage: .slots <amount>' 
            }, { quoted: msg });
        }

        if (bet > (context.userData.balance || 0)) {
            return await sock.sendMessage(context.from, { 
                text: `⚠️ Insufficient funds!\n💰 Your balance: ${formatNumber(context.userData.balance || 0)} coins` 
            }, { quoted: msg });
        }

        const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '⭐'];
        const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
        const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
        const slot3 = symbols[Math.floor(Math.random() * symbols.length)];

        let winAmount = 0;
        let result = '';

        if (slot1 === slot2 && slot2 === slot3) {
            winAmount = bet * 10;
            result = '🎰 JACKPOT!';
        } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
            winAmount = bet * 2;
            result = '🎉 WIN!';
        } else {
            winAmount = -bet;
            result = '😢 LOSS!';
        }

        await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) + winAmount);

        const text = `🎰 *SLOT MACHINE* 🎰

[ ${slot1} | ${slot2} | ${slot3} ]

${result}
${winAmount > 0 ? `💰 You won ${formatNumber(winAmount)} coins!` : `💸 You lost ${formatNumber(Math.abs(winAmount))} coins!`}

💵 New balance: ${formatNumber((context.userData.balance || 0) + winAmount)} coins`;

        await sock.sendMessage(context.from, { text }, { quoted: msg });
    }
};
