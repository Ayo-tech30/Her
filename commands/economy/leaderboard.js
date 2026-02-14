import { db } from '../../index.js';
import { formatNumber } from '../../utils/formatter.js';

export default {
    name: 'leaderboard',
    aliases: ['lb'],
    description: 'View top users by balance',
    execute: async (sock, msg, args, context) => {
        const usersSnapshot = await db.ref('users').once('value');
        const users = usersSnapshot.val() || {};
        
        const userList = Object.entries(users).map(([id, data]) => ({
            id,
            name: data.name || 'Unknown',
            balance: (data.balance || 0) + (data.bank || 0)
        }));

        userList.sort((a, b) => b.balance - a.balance);
        const top10 = userList.slice(0, 10);

        let leaderboard = '┏━━━━━━━━━━━━━❥❥❥\n';
        leaderboard += '┃  💰 *LEADERBOARD* 💰\n';
        leaderboard += '┗━━━━━━━━━━━━━❥❥❥\n';
        leaderboard += '┏━━━━━━━━━━━━━❥❥❥\n';

        top10.forEach((user, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
            leaderboard += `┃ ${medal} ${user.name}\n`;
            leaderboard += `┃    💵 ${formatNumber(user.balance)}\n`;
        });

        leaderboard += '┗━━━━━━━━━━━━━❥❥❥';

        await sock.sendMessage(context.from, { text: leaderboard }, { quoted: msg });
    }
};
