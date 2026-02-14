# Nexora WhatsApp Bot

A full-featured WhatsApp bot with economy, games, admin tools, and more!

## Features

- 🎴 Card Collection System
- 🎮 Economy System (Balance, Daily, Gamble, etc.)
- 🎰 Casino Games (Slots, Coinflip, Dice, etc.)
- 👤 Interaction Commands (Hug, Kiss, Slap, etc.)
- 🎉 Fun Commands (Ship, Joke, Truth/Dare, etc.)
- ⚙️ Admin Tools (Kick, Promote, Demote, etc.)
- 🤖 AI Integration (Placeholder for GPT, Imagine, etc.)
- 📲 Downloaders (Placeholder for IG, TikTok, YouTube, etc.)
- 🌸 Anime Commands (Placeholder)

## Setup Instructions

### 1. Prerequisites
- Node.js v18 or higher
- Firebase account
- WhatsApp account

### 2. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Realtime Database
4. Go to Project Settings > Service Accounts
5. Click "Generate New Private Key"
6. Download the JSON file and rename it to `firebase-config.json`
7. Place it in the root directory

### 3. Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit firebase-config.json with your credentials
```

### 4. Running the Bot

```bash
npm start
```

### 5. Pairing
1. When you first run the bot, it will ask for your WhatsApp number
2. Enter your number with country code (e.g., 2349049460676)
3. You'll receive a pairing code
4. Open WhatsApp on your phone
5. Go to Settings > Linked Devices > Link a Device
6. Click "Link with phone number instead"
7. Enter the pairing code

## Deployment on Replit

1. Create a new Repl
2. Import from GitHub or upload files
3. Add Firebase config as a secret:
   - Key: `FIREBASE_CONFIG`
   - Value: Paste your firebase-config.json content
4. Update `index.js` to read from secrets if needed
5. Click "Run"

## Commands

Use `.menu` to see all available commands!

### Economy
- `.balance` / `.bal` - Check balance
- `.daily` - Claim daily reward
- `.profile` / `.p` - View profile
- `.reg` - Register account
- `.withdraw` / `.wd` - Withdraw from bank
- `.deposit` / `.dep` - Deposit to bank

### Games & Gamble
- `.slots <amount>` - Play slots
- `.cf <amount> <heads/tails>` - Coinflip
- `.gamble <amount>` - Gamble coins

### Admin (Group Only)
- `.kick @user` - Kick member
- `.promote @user` - Promote to admin
- `.demote @user` - Demote from admin
- `.tagall <message>` - Tag all members
- `.open` - Open group
- `.close` - Close group
- `.welcome on/off` - Toggle welcome
- `.setwelcome <msg>` - Set welcome message

### Moderator Commands
- `.join <link>` - Join group
- `.leave` - Leave group
- `.pm` - Self promote to admin
- `.dm` - Self demote from admin

### Owner Commands
- `.addmod @user` - Add moderator
- `.addguardian @user` - Add guardian

### Fun & Interaction
- `.hug @user` - Hug someone
- `.kiss @user` - Kiss someone
- `.slap @user` - Slap someone
- `.ship @user1 @user2` - Ship meter
- `.joke` - Random joke
- `.truth` - Truth question
- `.dare` - Dare challenge

### General
- `.ping` - Check response time
- `.support` - Get support info
- `.mods` - View staff list

## Configuration

Edit these values in your files:

- **Owner Number**: `2349049460676` (in index.js and handlers)
- **Prefix**: `.` (in utils/formatter.js)
- **Bot Name**: Violet (in utils/formatter.js)

## Project Structure

```
nexora-bot/
├── index.js              # Main bot file
├── package.json          # Dependencies
├── firebase-config.json  # Firebase credentials
├── handlers/
│   ├── messageHandler.js # Message processing
│   └── commandLoader.js  # Dynamic command loading
├── commands/
│   ├── economy/          # Economy commands
│   ├── gamble/           # Gambling commands
│   ├── admin/            # Admin commands
│   ├── interaction/      # Interaction commands
│   ├── fun/              # Fun commands
│   ├── cards/            # Card commands (placeholder)
│   ├── games/            # Game commands (placeholder)
│   ├── ai/               # AI commands (placeholder)
│   ├── downloaders/      # Downloader commands (placeholder)
│   └── anime/            # Anime commands (placeholder)
└── utils/
    ├── formatter.js      # Formatting utilities
    └── interactions.js   # Interaction helpers
```

## Features to Implement

The following commands have placeholders and need implementation:

### Cards System
- Card spawning, claiming, trading
- Card info, collection, deck management
- Card shop, auctions, stardust

### Games
- Tic-tac-toe, Chess, Connect 4
- Akinator, Greek God game
- Battle system

### AI
- GPT integration
- Image generation
- Translation, transcription

### Downloaders
- Instagram, TikTok, YouTube
- Facebook, Twitter/X
- Music download

### Anime
- Waifu, neko images
- NSFW toggle system

## Notes

- The bot prevents responding to messages from before it started
- Messages are tracked to prevent duplicate responses on reconnection
- Bot automatically becomes admin if the linked number is admin
- Firebase is used for persistent storage

## Support

Creator: KYNX
WhatsApp: wa.me/2349049460676

## License

MIT License - Feel free to modify and use!
