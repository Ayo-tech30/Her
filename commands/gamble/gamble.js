import { db } from '../../index.js';
import { formatNumber } from '../../utils/formatter.js';

export default {
    name: 'gamble',
    description: 'Gamble your coins',
    execute: async (sock, msg, args, context) => {
        const amount = parseInt(args[0]);

        if (!amount || isNaN(amount) || amount <= 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please specify a valid amount!\nUsage: .gamble <amount>' 
            }, { quoted: msg });
        }

        if (amount > (context.userData.balance || 0)) {
            return await sock.sendMessage(context.from, { 
                text: `⚠️ Insufficient funds!\n💰 Your balance: ${formatNumber(context.userData.balance || 0)} coins` 
            }, { quoted: msg });
        }

        const win = Math.random() > 0.5;
        const multiplier = Math.random() * 1.5 + 0.5; // 0.5x to 2x
        const winAmount = Math.floor(amount * multiplier);

        if (win) {
            await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) + winAmount);
            await sock.sendMessage(context.from, { 
                text: `🎰 *GAMBLE WIN!*\n\n💰 You won ${formatNumber(winAmount)} coins!\n🎉 New balance: ${formatNumber((context.userData.balance || 0) + winAmount)} coins` 
            }, { quoted: msg });
        } else {
            await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) - amount);
            await sock.sendMessage(context.from, { 
                text: `🎰 *GAMBLE LOSS!*\n\n💸 You lost ${formatNumber(amount)} coins!\n😢 New balance: ${formatNumber((context.userData.balance || 0) - amount)} coins` 
            }, { quoted: msg });
        }
    }
};
