import { random } from '../../utils/formatter.js';

const dares = [
    "Send a voice note singing your favorite song!",
    "Change your status to something funny!",
    "Send a selfie to the group!",
    "Text your crush and tell them how you feel!",
    "Do 20 pushups and send a video!",
    "Tell a joke in the group!",
    "Say something nice about everyone in the group!",
    "Change your profile picture to something funny!",
    "Speak in third person for the next hour!",
    "Send a random meme to your contacts!"
];

export default {
    name: 'dare',
    description: 'Get a dare',
    execute: async (sock, msg, args, context) => {
        const dare = random(dares);
        await sock.sendMessage(context.from, { text: `😈 *DARE*\n\n${dare}` }, { quoted: msg });
    }
};
