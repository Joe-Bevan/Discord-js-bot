'use strict';

const fs = require('fs'); // Node.js native File stream (not provided by javascript)
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json'); // Load the prefix and token in from a external file


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Only gets javascript files

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Log the bot onto discords servers
client.login(token);


// When the bot is ready
client.on('ready', () => {
    console.log(`${Timestamp()} Logged in as ${client.user.tag}!`);
    client.user.setActivity(prefix + "help");
});


// When the bot detects a message
client.on('message', async msg => {

    if (!msg.content.startsWith(prefix)) return; // Invalid prefix supplied
    if (!msg.guild) return; // Don't handle msg DM's

    // Commands parsing / filtering (All commands are forced into lowercase)
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    if (!client.commands.has(command)) return; // If we dont have that command

    try {
        client.commands.get(command).execute(msg, args);
        console.log(`${Timestamp()} [${msg.guild.name}] "${command}" was called. Args: ${args}`);
    } catch (error) {
        console.error(error);
        msg.reply('There was an error trying to execute that command!');
    }


}); // End of onMessage


// Simple timestamp function for formating the time.
function Timestamp() {
    return `[${new Date().toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: 'numeric'
    })}]`;
}