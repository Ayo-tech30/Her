import { db } from '../../index.js';
import { formatNumber } from '../../utils/formatter.js';

export default {
    name: 'deposit',
    aliases: ['dep'],
    description: 'Deposit coins to bank',
    execute: async (sock, msg, args, context) => {
        const amount = args[0] === 'all' ? context.userData.balance : parseInt(args[0]);

        if (!amount || isNaN(amount) || amount <= 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please specify a valid amount!\nUsage: .deposit <amount> or .deposit all' 
            }, { quoted: msg });
        }

        if (amount > (context.userData.balance || 0)) {
            return await sock.sendMessage(context.from, { 
                text: `⚠️ Insufficient funds in wallet!\n💰 Wallet balance: ${formatNumber(context.userData.balance || 0)} coins` 
            }, { quoted: msg });
        }

        await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) - amount);
        await db.ref(`users/${context.userId}/bank`).set((context.userData.bank || 0) + amount);

        await sock.sendMessage(context.from, { 
            text: `✅ Successfully deposited ${formatNumber(amount)} coins to bank!` 
        }, { quoted: msg });
    }
};
