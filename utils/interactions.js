export const interactions = {
    hug: { text: '{user1} hugs {user2}! 🤗', gif: 'hug' },
    kiss: { text: '{user1} kisses {user2}! 😘', gif: 'kiss' },
    slap: { text: '{user1} slaps {user2}! 👋', gif: 'slap' },
    wave: { text: '{user1} waves at {user2}! 👋', gif: 'wave' },
    pat: { text: '{user1} pats {user2}! 🫳', gif: 'pat' },
    dance: { text: '{user1} dances with {user2}! 💃', gif: 'dance' },
    sad: { text: '{user1} is sad... 😢', gif: 'sad' },
    smile: { text: '{user1} smiles at {user2}! 😊', gif: 'smile' },
    laugh: { text: '{user1} laughs! 😂', gif: 'laugh' },
    lick: { text: '{user1} licks {user2}! 👅', gif: 'lick' },
    punch: { text: '{user1} punches {user2}! 👊', gif: 'punch' },
    kill: { text: '{user1} kills {user2}! ☠️', gif: 'kill' },
    bonk: { text: '{user1} bonks {user2}! 🔨', gif: 'bonk' },
    tickle: { text: '{user1} tickles {user2}! 😆', gif: 'tickle' },
    shrug: { text: '{user1} shrugs ¯\\_(ツ)_/¯', gif: 'shrug' },
    kidnap: { text: '{user1} kidnaps {user2}! 🚐', gif: 'kidnap' }
};

export function createInteractionCommand(name) {
    return {
        name,
        description: `${name} someone`,
        execute: async (sock, msg, args, context) => {
            const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            const user1 = context.pushname;
            const user2 = mentioned && mentioned[0] ? `@${mentioned[0].split('@')[0]}` : 'someone';
            
            const interaction = interactions[name];
            const text = interaction.text
                .replace('{user1}', user1)
                .replace('{user2}', user2);

            await sock.sendMessage(context.from, { 
                text,
                mentions: mentioned || []
            }, { quoted: msg });
        }
    };
}
