import { db } from '../../index.js';
import { formatNumber } from '../../utils/formatter.js';

export default {
    name: 'profile',
    aliases: ['p'],
    description: 'View your profile',
    execute: async (sock, msg, args, context) => {
        const userData = context.userData;
        const balance = userData.balance || 0;
        const bank = userData.bank || 0;
        const orbs = userData.orbs || 0;
        const name = userData.name || context.pushname;
        const bio = userData.bio || 'No bio set';
        const age = userData.age || 'Not set';
        const registered = userData.registered ? '✅' : '❌';

        const text = `┏━━━━━━━━━━━━━❥❥❥
┃     👤 *PROFILE*
┗━━━━━━━━━━━━━❥❥❥
┏━━━━━━━━━━━━━❥❥❥
┃ 📛 Name: ${name}
┃ 📱 Number: @${context.userId}
┃ 📝 Bio: ${bio}
┃ 🎂 Age: ${age}
┃ ✨ Registered: ${registered}
┗━━━━━━━━━━━━━❥❥❥
┏━━━━━━━━━━━━━❥❥❥
┃ 💰 Wallet: ${formatNumber(balance)}
┃ 🏦 Bank: ${formatNumber(bank)}
┃ 🔮 Orbs: ${formatNumber(orbs)}
┃ 🎴 Cards: ${userData.cards?.length || 0}
┗━━━━━━━━━━━━━❥❥❥`;

        await sock.sendMessage(context.from, { 
            text,
            mentions: [context.sender]
        }, { quoted: msg });
    }
};
