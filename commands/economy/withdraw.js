import { db } from '../../index.js';
import { formatNumber } from '../../utils/formatter.js';

export default {
    name: 'withdraw',
    aliases: ['wd'],
    description: 'Withdraw coins from bank',
    execute: async (sock, msg, args, context) => {
        const amount = args[0] === 'all' ? context.userData.bank : parseInt(args[0]);

        if (!amount || isNaN(amount) || amount <= 0) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please specify a valid amount!\nUsage: .withdraw <amount> or .withdraw all' 
            }, { quoted: msg });
        }

        if (amount > (context.userData.bank || 0)) {
            return await sock.sendMessage(context.from, { 
                text: `⚠️ Insufficient funds in bank!\n🏦 Bank balance: ${formatNumber(context.userData.bank || 0)} coins` 
            }, { quoted: msg });
        }

        await db.ref(`users/${context.userId}/bank`).set((context.userData.bank || 0) - amount);
        await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) + amount);

        await sock.sendMessage(context.from, { 
            text: `✅ Successfully withdrew ${formatNumber(amount)} coins from bank!` 
        }, { quoted: msg });
    }
};
