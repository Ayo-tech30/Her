import { db } from '../../index.js';

export default {
    name: 'reg',
    description: 'Register your account',
    execute: async (sock, msg, args, context) => {
        if (context.userData.registered) {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ You are already registered!' 
            }, { quoted: msg });
        }

        await db.ref(`users/${context.userId}/registered`).set(true);
        await db.ref(`users/${context.userId}/balance`).set(10000);

        await sock.sendMessage(context.from, { 
            text: `✅ *Registration Successful!*\n\n🎉 Welcome to Nexora!\n💰 You received 10,000 coins as a starter bonus!\n\nUse .menu to see available commands!` 
        }, { quoted: msg });
    }
};
