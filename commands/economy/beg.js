import { db } from '../../index.js';
import { formatNumber, random } from '../../utils/formatter.js';

const responses = [
    { person: 'Elon Musk', amount: [1000, 5000] },
    { person: 'Bill Gates', amount: [800, 4000] },
    { person: 'A generous stranger', amount: [500, 3000] },
    { person: 'Your mom', amount: [200, 1000] },
    { person: 'A kind passerby', amount: [100, 800] },
    { person: 'A homeless person', amount: [10, 100] }
];

export default {
    name: 'beg',
    description: 'Beg for coins',
    execute: async (sock, msg, args, context) => {
        const now = Date.now();
        const lastBeg = context.userData.lastBeg || 0;
        const cooldown = 60 * 1000; // 1 minute

        if (now - lastBeg < cooldown) {
            const remaining = Math.ceil((cooldown - (now - lastBeg)) / 1000);
            return await sock.sendMessage(context.from, { 
                text: `⏰ You already begged recently!\nWait ${remaining} seconds.` 
            }, { quoted: msg });
        }

        const response = random(responses);
        const amount = Math.floor(Math.random() * (response.amount[1] - response.amount[0])) + response.amount[0];

        await db.ref(`users/${context.userId}/balance`).set((context.userData.balance || 0) + amount);
        await db.ref(`users/${context.userId}/lastBeg`).set(now);

        await sock.sendMessage(context.from, { 
            text: `🥺 You begged ${response.person}\n💰 They gave you ${formatNumber(amount)} coins!` 
        }, { quoted: msg });
    }
};
