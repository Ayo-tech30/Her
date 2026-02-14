import { db } from '../../index.js';

export default {
    name: 'welcome',
    description: 'Toggle welcome messages',
    adminOnly: true,
    groupOnly: true,
    execute: async (sock, msg, args, context) => {
        const action = args[0]?.toLowerCase();
        
        if (action !== 'on' && action !== 'off') {
            return await sock.sendMessage(context.from, { 
                text: '⚠️ Please specify on or off!\nUsage: .welcome on/off' 
            }, { quoted: msg });
        }

        const enabled = action === 'on';
        await db.ref(`groups/${context.from}/settings/welcome`).set(enabled);

        await sock.sendMessage(context.from, { 
            text: `✅ Welcome messages ${enabled ? 'enabled' : 'disabled'}!` 
        }, { quoted: msg });
    }
};
