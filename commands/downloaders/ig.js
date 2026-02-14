export default {
    name: 'ig',
    description: 'Download Instagram media',
    execute: async (sock, msg, args, context) => {
        await sock.sendMessage(context.from, { 
            text: '⚠️ This feature is under development!\n\nTo implement:\n1. Use Instagram API or scraper\n2. Extract media URLs\n3. Send media to user\n\nUsage: .ig <instagram_url>' 
        }, { quoted: msg });
    }
};
