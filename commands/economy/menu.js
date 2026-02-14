import { formatMenu } from '../../utils/formatter.js';

export default {
    name: 'menu',
    description: 'Display bot menu',
    execute: async (sock, msg, args, context) => {
        const menu = formatMenu(context.pushname);
        await sock.sendMessage(context.from, { text: menu }, { quoted: msg });
    }
};
