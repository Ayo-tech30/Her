import { db } from '../../index.js';
import { formatNumber } from '../../utils/formatter.js';

export default {
    name: 'cf',
    description: 'Play coinflip',
    execute: async (sock, msg, args, context) => {
        const bet = parseInt(args[0]);
        const choice = args[1]?.toLowerCase();

        if (!bet || isNaN(bet) || bet <= 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please specify a valid bet amount!\nUsage: .cf <amount> <heads/tails>' 
            }, { quoted: msg });
        }

        if (!choice || (choice !== 'heads' && choice !== 'tails')) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please choose heads or tails!\nUsage: .cf <amount> <heads/tails>' 
            }, { quoted: msg });
        }

        if (bet > (context.userData.balance || 0)) {
            return await sock.sendMessage(context.from, { 
                text: `⚠️ Insufficient funds!\n💰 Your balance: ${formatNumber(context.userData.balance || 0)} coins` 
            }, { quoted: msg });
        }

        const result = Math.random() > 0.5 ? 'heads' : 'tails';
        const win = result === choice;

        if (win) {
            await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) + bet);
            await sock.sendMessage(context.from, { 
                text: `🪙 *COINFLIP*\n\nResult: ${result.toUpperCase()}\n\n🎉 YOU WIN!\n💰 +${formatNumber(bet)} coins\n\n💵 New balance: ${formatNumber((context.userData.balance || 0) + bet)} coins` 
            }, { quoted: msg });
        } else {
            await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) - bet);
            await sock.sendMessage(context.from, { 
                text: `🪙 *COINFLIP*\n\nResult: ${result.toUpperCase()}\n\n😢 YOU LOSE!\n💸 -${formatNumber(bet)} coins\n\n💵 New balance: ${formatNumber((context.userData.balance || 0) - bet)} coins` 
            }, { quoted: msg });
        }
    }
};
