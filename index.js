'use strict';

const fs = require('fs'); // Node.js native File stream (not provided by javascript)
const Discord = require('discord.js');
const client = new Discord.Client();
var prefix;
var token;

if (fs.existsSync('config.json')) {
    var { prefix, token } = require('./config.json'); // Load the prefix and token in from a external file
} else {
    console.log(`${Timestamp()} Config file not found... creating one with default parameters.`);
    var data = {
        "prefix": ".",
        "token": "",
        "color": "0xF5A623",
        "botAvatar": "https://miro.medium.com/max/962/1*I9KrlBSL9cZmpQU3T2nq-A.jpeg",
        "timeTillAutoDisconnect": 60000
    };
    fs.writeFileSync('./config.json', JSON.stringify(data, null, 2));
    return;
}



client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Only gets javascript files

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Attempt to log the bot onto discords servers
if (token != "")
    client.login(token);
else {
    console.log(`${Timestamp()} No token was provided! Make sure you set it in the 'config.json' file`);
}


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