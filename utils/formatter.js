import { db } from '../index.js';

export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatMenu = (user = 'User') => {
    return `🌍⃝⃘̉̉̉━⋆─⋆──❂
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚㋛ ⋆｡ ❀
┊ ☠︎︎
✧ Hey ${user}𓂃✍︎𝄞
╰────────────────❂
┏━━━━━━━━━━━━━❥❥❥
┃     ✦ ɴᴇxᴏʀᴀ ✦
┗━━━━━━━━━━━━━❥❥❥
┏━━━━━━━━━━━━━❥❥❥
┃ ɴᴀᴍᴇ - Violet
┃ ᴄʀᴇᴀᴛᴏʀ - ꨄ︎ 𝙆𝙔𝙉𝙓 ꨄ︎
┃ ᴘʀᴇꜰɪx - [ . ]
┃ ꜱᴜᴘᴘᴏʀᴛ - .support
┗━━━━━━━━━━━━━❥❥❥
┏━「 🎴 ᴄᴀʀᴅꜱ 」
┃ .cards [on/off]
┃ .card [index]
┃ .ci [name] [tier]
┃ .cardinfo [name] [tier]
┃ .si [name]
┃ .ss [series_name]
┃ .slb [series_name]
┃ .clb
┃ .deck
┃ .col
┃ .cardshop
┃ .sellc [index] [price]
┃ .rc [index]
┃ .vs
┃ .claim [id]
┃ .sc [@] [index] [price]
┃ .tc [@] [index] [index]
┃ .lendcard / lc
┃ .auction
┃ .submit [index] [price]
┃ .myauc
┃ .remauc [index]
┃ .listauc
┃ .stardust
┃ .anticamp
┗━━━━━━━━━━━━━❥❥❥
┏━「 🎮 ᴇᴄᴏɴᴏᴍʏ 」
┃ .balance / bal
┃ .orbs
┃ .ebal
┃ .daily
┃ .withdraw / wd
┃ .deposit / dep
┃ .donate
┃ .lottery
┃ .rich
┃ .richg
┃ .reg
┃ .setname <name>
┃ .rename <name>
┃ .profile / p
┃ .edit
┃ .bio [bio]
┃ .setage [age]
┃ .inventory / inv
┃ .use [item name]
┃ .sell [item_name]
┃ .shop
┃ .dig
┃ .fish
┃ .leaderboard / lb
┃ .roast
┃ .gamble
┃ .beg
┃ .ping
┗━━━━━━━━━━━━━❥❥❥
┏━「 🕹️ ɢᴀᴍᴇꜱ 」
┃ .ttt
┃ .startbattle
┃ .akinator / aki
┃ .greekgod / gg
┃ .c4
┃ .wcg
┃ .chess
┗━━━━━━━━━━━━━❥❥❥
┏━「 🏰 ɢᴜɪʟᴅꜱ 」
┃ ⚠️ Under Development
┃ .guild info
┃ .guild create [name]
┃ .guild accept
┃ .guild decline
┃ .guild emblem
┗━━━━━━━━━━━━━❥❥❥
┏━「 🎰 ɢᴀᴍʙʟᴇ 」
┃ .slots
┃ .cf
┃ .dice
┃ .db
┃ .dp
┃ .roulette
┃ .horse
┗━━━━━━━━━━━━━❥❥❥
┏━「 🐾 ᴘᴇᴛꜱ 」
┃ ⚠️ Under Development
┃ .pet
┃ .pet feed
┃ .pet play
┃ .pet name
┗━━━━━━━━━━━━━❥❥❥
┏━「 ⚔️ ʀᴘɢ 」
┃ ⚠️ Under Development
┗━━━━━━━━━━━━━❥❥❥
┏━「 👤 ɪɴᴛᴇʀᴀᴄᴛɪᴏɴ 」
┃ .hug
┃ .kiss
┃ .slap
┃ .wave
┃ .pat
┃ .dance
┃ .sad
┃ .smile
┃ .laugh
┃ .lick
┃ .punch
┃ .jihad
┃ .crusade
┃ .kill
┃ .bonk
┃ .fuck
┃ .tickle
┃ .shrug
┃ .wank
┃ .kidnap
┗━━━━━━━━━━━━━❥❥❥
┏━「 🎉 ꜰᴜɴ 」
┃ .gay
┃ .lesbian
┃ .simp
┃ .ship
┃ .skill
┃ .duality
┃ .gen
┃ .pov
┃ .social
┃ .relation
┃ .pp
┃ .wouldyourather / wyr
┃ .joke
┃ .truth
┃ .dare
┃ .td
┃ .uno
┗━━━━━━━━━━━━━❥❥❥
┏━「 📲 ᴅᴏᴡɴʟᴏᴀᴅᴇʀꜱ 」
┃ .ig
┃ .ttk
┃ .yt
┃ .x
┃ .fb
┃ .play
┗━━━━━━━━━━━━━❥❥❥
┏━「 🔍 ꜱᴇᴀʀᴄʜ 」
┃ .pinterest / pint
┃ .sauce / reverseimg
┃ .wallpaper
┃ .lyrics
┗━━━━━━━━━━━━━❥❥❥
┏━「 🤖 ᴀɪ 」
┃ .copilot
┃ .gpt
┃ .perplexity
┃ .imagine
┃ .upscale
┃ .translate / tt
┃ .transcribe / tb
┗━━━━━━━━━━━━━❥❥❥
┏━「 🔄 ᴄᴏɴᴠᴇʀᴛᴇʀ 」
┃ .sticker / s
┃ .take
┃ .toimg
┃ .tovid
┃ .rotate
┗━━━━━━━━━━━━━❥❥❥
┏━「 🌸 ᴀɴɪᴍᴇ ꜱꜰᴡ 」
┃ .waifu
┃ .neko
┃ .maid
┃ .mori-calliope
┃ .raiden-shogun
┃ .oppai
┃ .selfies
┃ .uniform
┃ .kamisato-ayaka
┗━━━━━━━━━━━━━❥❥❥
┏━「 🔞 ᴀɴɪᴍᴇ ɴꜱꜰᴡ 」
┃ .nsfw on/off
┃ .milf
┃ .ass
┃ .hentai
┃ .oral
┃ .ecchi
┃ .paizuri
┃ .ero
┃ .ehentai
┃ .nhentai
┗━━━━━━━━━━━━━❥❥❥
┏━「 ⚙️ ᴀᴅᴍɪɴ 」
┃ .kick
┃ .delete
┃ .antilink
┃ .antilink action
┃ .antism on/off
┃ .warn @mention [reason]
┃ .resetwarn
┃ .groupstats / gs
┃ .welcome on/off
┃ .setwelcome
┃ .leave on/off
┃ .setleave
┃ .purge [code]
┃ .blacklist add [code]
┃ .blacklist remove [code]
┃ .blacklist list
┃ .promote
┃ .demote
┃ .mute
┃ .unmute
┃ .hidetag
┃ .tagall
┃ .activity
┃ .active
┃ .inactive
┃ .open
┃ .close
┗━━━━━━━━━━━━━❥❥❥
nexora </> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɴᴇxᴏʀᴀ • ꨄ︎ 𝙆𝙔𝙉𝙓 ꨄ︎`;
};

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getTime = () => {
    const date = new Date();
    return date.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
};
