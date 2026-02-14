import { db } from '../../index.js';

export default {
    name: 'mods',
    description: 'Display bot moderators and guardians',
    execute: async (sock, msg, args, context) => {
        const mods = (await db.ref('mods').once('value')).val() || [];
        const guardians = (await db.ref('guardians').once('value')).val() || [];
        const owner = '2349049460676';

        let modsList = '';
        if (mods.length > 0) {
            modsList = mods.map((mod, i) => `┃ ${i + 1}. @${mod}`).join('\n');
        } else {
            modsList = '┃ No moderators';
        }

        let guardiansList = '';
        if (guardians.length > 0) {
            guardiansList = guardians.map((g, i) => `┃ ${i + 1}. @${g}`).join('\n');
        } else {
            guardiansList = '┃ No guardians';
        }

        const text = `🌍⃝⃘̉̉̉━⋆─⋆──❂
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚㋛ ⋆｡ ❀
┊ ☠︎︎
✧ ɴᴇxᴏʀᴀ ꜱᴛᴀꜰꜰ𓂃✍︎𝄞
╰────────────────❂
┏━━━━━━━━━━━━━❥❥❥
┃     ✦ ꜱᴛᴀꜰꜰ ʟɪꜱᴛ ✦
┗━━━━━━━━━━━━━❥❥❥
┏━「 👑 ᴏᴡɴᴇʀ 」
┃ @${owner}
┗━━━━━━━━━━━━━❥❥❥
┏━「 🛡️ ᴍᴏᴅᴇʀᴀᴛᴏʀꜱ 」
${modsList}
┗━━━━━━━━━━━━━❥❥❥
┏━「 ⚔️ ɢᴜᴀʀᴅɪᴀɴꜱ 」
${guardiansList}
┗━━━━━━━━━━━━━❥❥❥
nexora </> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɴᴇxᴏʀᴀ • ꨄ︎ 𝙆𝙔𝙉𝙓 ꨄ︎`;

        const mentions = [
            owner + '@s.whatsapp.net',
            ...mods.map(m => m + '@s.whatsapp.net'),
            ...guardians.map(g => g + '@s.whatsapp.net')
        ];

        await sock.sendMessage(context.from, { text, mentions }, { quoted: msg });
    }
};
