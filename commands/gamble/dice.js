import { db } from '../../index.js';
import { formatNumber } from '../../utils/formatter.js';

export default {
    name: 'dice',
    description: 'Roll dice and gamble',
    execute: async (sock, msg, args, context) => {
        const bet = parseInt(args[0]);

        if (!bet || isNaN(bet) || bet <= 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please specify a valid bet amount!\nUsage: .dice <amount>' 
            }, { quoted: msg });
        }

        if (bet > (context.userData.balance || 0)) {
            return await sock.sendMessage(context.from, { 
                text: `⚠️ Insufficient funds!\n💰 Your balance: ${formatNumber(context.userData.balance || 0)} coins` 
            }, { quoted: msg });
        }

        const userRoll = Math.floor(Math.random() * 6) + 1;
        const botRoll = Math.floor(Math.random() * 6) + 1;

        let result = '';
        let winAmount = 0;

        if (userRoll > botRoll) {
            winAmount = bet;
            result = '🎉 YOU WIN!';
            await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) + winAmount);
        } else if (userRoll < botRoll) {
            winAmount = -bet;
            result = '😢 YOU LOSE!';
            await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) - bet);
        } else {
            result = '🤝 TIE!';
        }

        const text = `🎲 *DICE ROLL* 🎲

You rolled: ${userRoll}
Bot rolled: ${botRoll}

${result}
${winAmount > 0 ? `💰 +${formatNumber(winAmount)} coins` : winAmount < 0 ? `💸 ${formatNumber(Math.abs(winAmount))} coins` : '💵 No change'}

💵 Balance: ${formatNumber((context.userData.balance || 0) + winAmount)} coins`;

        await sock.sendMessage(context.from, { text }, { quoted: msg });
    }
};
