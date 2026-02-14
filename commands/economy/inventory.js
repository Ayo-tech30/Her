export default {
    name: 'inventory',
    aliases: ['inv'],
    description: 'View your inventory',
    execute: async (sock, msg, args, context) => {
        const inventory = context.userData.inventory || {};
        const items = Object.entries(inventory);

        if (items.length === 0) {
            return await sock.sendMessage(context.from, { 
                text: '📦 *Your Inventory*\n\nYour inventory is empty!' 
            }, { quoted: msg });
        }

        let text = '📦 *Your Inventory*\n\n';
        items.forEach(([item, quantity]) => {
            text += `▫️ ${item}: ${quantity}x\n`;
        });

        await sock.sendMessage(context.from, { text }, { quoted: msg });
    }
};
