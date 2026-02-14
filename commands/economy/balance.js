import { db } from '../../index.js';
import { formatNumber } from '../../utils/formatter.js';

export default {
    name: 'balance',
    aliases: ['bal'],
    description: 'Check your balance',
    execute: async (sock, msg, args, context) => {
        const balance = context.userData.balance || 0;
        const bank = context.userData.bank || 0;
        const total = balance + bank;

        const text = `💰 *${context.userData.name || context.pushname}'s Balance*

💵 Wallet: ${formatNumber(balance)} coins
🏦 Bank: ${formatNumber(bank)} coins
💎 Total: ${formatNumber(total)} coins`;

        await sock.sendMessage(context.from, { text }, { quoted: msg });
    }
};
