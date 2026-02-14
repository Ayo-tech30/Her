import { random } from '../../utils/formatter.js';

const truths = [
    "What's the most embarrassing thing you've ever done?",
    "What's your biggest fear?",
    "What's the worst lie you've ever told?",
    "What's your biggest secret?",
    "Who is your crush?",
    "What's the most childish thing you still do?",
    "What's something you've never told anyone?",
    "What's your biggest regret?",
    "What's the meanest thing you've ever said to someone?",
    "What's your most embarrassing moment in school?"
];

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
    name: 'truth',
    description: 'Get a truth question',
    execute: async (sock, msg, args, context) => {
        const truth = random(truths);
        await sock.sendMessage(context.from, { text: `🤔 *TRUTH*\n\n${truth}` }, { quoted: msg });
    }
};

export const dare = {
    name: 'dare',
    description: 'Get a dare',
    execute: async (sock, msg, args, context) => {
        const dareText = random(dares);
        await sock.sendMessage(context.from, { text: `😈 *DARE*\n\n${dareText}` }, { quoted: msg });
    }
};
