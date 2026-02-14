import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const commands = new Map();

export async function loadCommands() {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        if (!fs.statSync(folderPath).isDirectory()) continue;

        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            try {
                const command = await import(`file://${filePath}`);
                if (command.default && command.default.name) {
                    commands.set(command.default.name, command.default);
                    console.log(chalk.green(`✓ Loaded command: ${command.default.name}`));
                }
            } catch (error) {
                console.error(chalk.red(`✗ Error loading ${file}:`), error.message);
            }
        }
    }

    console.log(chalk.cyan(`\n📦 Total commands loaded: ${commands.size}\n`));
}
