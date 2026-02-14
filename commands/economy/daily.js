import { db } from '../../index.js';
import { formatNumber } from '../../utils/formatter.js';

export default {
    name: 'daily',
    description: 'Claim your daily reward',
    execute: async (sock, msg, args, context) => {
        const now = Date.now();
        const lastDaily = context.userData.lastDaily || 0;
        const cooldown = 24 * 60 * 60 * 1000; // 24 hours

        if (now - lastDaily < cooldown) {
            const remaining = cooldown - (now - lastDaily);
            const hours = Math.floor(remaining / (60 * 60 * 1000));
            const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
            
            return await sock.sendMessage(context.from, { 
                text: `⏰ You already claimed your daily reward!\nCome back in ${hours}h ${minutes}m` 
            }, { quoted: msg });
        }

        const reward = Math.floor(Math.random() * 5000) + 5000; // 5000-10000 coins
        
        await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) + reward);
        await db.ref(`users/${context.userId}/lastDaily`).set(now);

        await sock.sendMessage(context.from, { 
            text: `🎁 *Daily Reward Claimed!*\n\n💰 You received ${formatNumber(reward)} coins!\n\nCome back tomorrow for more! 🔥` 
        }, { quoted: msg });
    }
};
