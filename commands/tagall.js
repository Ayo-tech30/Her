export default {
    name: 'tagall',
    description: 'Tag all group members',
    adminOnly: true,
    groupOnly: true,
    execute: async (sock, msg, args, context) => {
        const groupMetadata = await sock.groupMetadata(context.from);
        const participants = groupMetadata.participants;
        const message = args.join(' ') || 'Important announcement';

        let membersList = '';
        const mentions = [];

        participants.forEach((participant, index) => {
            membersList += `┃ @${participant.id.split('@')[0]}\n`;
            mentions.push(participant.id);
        });

        const text = `🌍⃝⃘̉̉̉━⋆─⋆──❂
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚㋛ ⋆｡ ❀
┊ ☠︎︎
✧ ${message}𓂃✍︎𝄞
╰────────────────❂
┏━━━━━━━━━━━━━❥❥❥
┃     ✦ ɴᴇxᴏʀᴀ ᴛᴀɢᴀʟʟ ✦
┗━━━━━━━━━━━━━❥❥❥
┏━「 👥 ᴍᴇᴍʙᴇʀꜱ 」
${membersList}┗━━━━━━━━━━━━━❥❥❥
┏━━━━━━━━━━━━━❥❥❥
┃ ɢʀᴏᴜᴘ - ${groupMetadata.subject}
┃ ᴍᴇᴍʙᴇʀꜱ - ${participants.length}
┃ ᴛᴀɢɢᴇᴅ ʙʏ - ${context.pushname}
┗━━━━━━━━━━━━━❥❥❥`;

        await sock.sendMessage(context.from, { text, mentions }, { quoted: msg });
    }
};
