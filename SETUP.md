# Nexora WhatsApp Bot - Quick Start Guide

## Step-by-Step Setup

### 1. Firebase Setup (IMPORTANT!)
Before running the bot, you MUST set up Firebase:

1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Enter project name (e.g., "nexora-bot")
4. Disable Google Analytics (optional)
5. Click "Create Project"

### 2. Enable Realtime Database
1. In your Firebase project, click "Realtime Database"
2. Click "Create Database"
3. Choose location (closest to you)
4. Start in "Test mode" (you can change later)

### 3. Get Service Account Key
1. Click the gear icon ⚙️ > Project Settings
2. Go to "Service Accounts" tab
3. Click "Generate New Private Key"
4. Click "Generate Key" - a JSON file will download
5. Rename this file to `firebase-config.json`
6. Place it in the bot's root directory

### 4. Install Node.js
- Download from https://nodejs.org/ (v18 or higher)
- Install and verify: `node --version`

### 5. Install Dependencies
Open terminal in the bot folder and run:
```bash
npm install
```

### 6. Start the Bot
```bash
npm start
```

### 7. Pair with WhatsApp
1. Bot will ask for your WhatsApp number
2. Enter with country code (e.g., 2349049460676)
3. You'll get a pairing code (e.g., ABCD-EFGH)
4. Open WhatsApp on your phone
5. Go to: Settings > Linked Devices > Link a Device
6. Tap "Link with phone number instead"
7. Enter the pairing code

### 8. Test the Bot
Send `.menu` to see if it's working!

## Deploying on Replit

### Method 1: Import from GitHub
1. Upload your bot to GitHub
2. Create new Repl on replit.com
3. Choose "Import from GitHub"
4. Paste your repository URL

### Method 2: Upload Directly
1. Create new Repl (Node.js)
2. Upload all files
3. Add Secret (Firebase config):
   - Key: `FIREBASE_CONFIG`
   - Value: Paste entire firebase-config.json content

### Replit Configuration
Add to index.js (before initializeApp):
```javascript
// For Replit deployment
let serviceAccount;
if (process.env.FIREBASE_CONFIG) {
    serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
    serviceAccount = JSON.parse(fs.readFileSync('./firebase-config.json', 'utf8'));
}
```

## Troubleshooting

### "Cannot find module '@whiskeysockets/baileys'"
Solution: Run `npm install`

### "Firebase Database URL not found"
Solution: Make sure firebase-config.json has "databaseURL" field

### "Connection closed"
Solution: 
- Check internet connection
- Verify WhatsApp account is active
- Delete `auth_info` folder and re-pair

### Bot not responding
Solution:
- Make sure bot is running
- Check if commands start with `.` (dot)
- Verify you're not banned

### Pairing code not working
Solution:
- Make sure number includes country code
- Check for typos in the code
- Try getting a new code

## Important Notes

1. **Keep auth_info folder safe** - This contains your session
2. **Don't share firebase-config.json** - It has sensitive credentials
3. **Owner number** is set to 2349049460676 - Change if needed
4. **Bot prefix** is `.` - Change in utils/formatter.js if needed

## Customization

### Change Owner Number
Edit these files:
- `index.js` (line with ownerNumber)
- `handlers/messageHandler.js` (line with ownerNumber)

### Change Bot Name
Edit `utils/formatter.js` - Change "Violet" to your preferred name

### Change Prefix
Edit `handlers/messageHandler.js` - Change `const prefix = '.'`

## Commands Quick Reference

**Owner Only:**
- `.addmod @user` - Add moderator
- `.addguardian @user` - Add guardian

**Moderator:**
- `.join <link>` - Join group
- `.leave` - Leave group
- `.pm` - Self promote
- `.dm` - Self demote

**Admin (in groups):**
- `.kick @user`
- `.promote @user`
- `.demote @user`
- `.tagall <msg>`
- `.open` / `.close`

**Everyone:**
- `.menu` - Show all commands
- `.balance` - Check balance
- `.daily` - Daily reward
- `.gamble <amount>`
- `.slots <amount>`
- And many more!

## Support

If you need help:
- Check README.md for detailed info
- Contact creator: wa.me/2349049460676

Good luck with your bot! 🚀
