import { random } from '../../utils/formatter.js';

const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you call a fake noodle? An impasta!",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What's orange and sounds like a parrot? A carrot!",
    "Why did the bicycle fall over? It was two tired!",
    "What do you call a fish with no eyes? Fsh!",
    "Why can't Monday lift Saturday? It's a weak day!",
    "What did the ocean say to the beach? Nothing, it just waved!"
];

export default {
    name: 'joke',
    description: 'Get a random joke',
    execute: async (sock, msg, args, context) => {
        const joke = random(jokes);
        await sock.sendMessage(context.from, { text: `😂 ${joke}` }, { quoted: msg });
    }
};
