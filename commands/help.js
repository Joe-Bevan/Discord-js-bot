const { prefix, botAvatar } = require('../config.json'); // Load the prefix and token in from a external file

module.exports = {
    name: 'help',
    description: 'Pastes a list of all commands you can use to interact with the bot.',
    execute(message, args) {
        message.channel.send({
            "embed": {
                "title": "Bot Help pannel",
                "description": "",
                "color": 0xF5A623, // Supports hex and weird OLE formats
                "timestamp": new Date(),
                "footer": {
                    "icon_url": botAvatar,
                    "text": "Bot made by Joe Bevan",
                },
                "thumbnail": {
                    "url": botAvatar
                },
                "author": {
                    "name": "Discord-js-Bot",
                    "url": "https://github.com/Joe-Bevan/Discord-js-bot",
                    "icon_url": botAvatar
                },
                "fields": [
                    {
                        "name": prefix,
                        "value": `The '${prefix}' character is used to summon the bot.\nAll commands **must** be prefaced with this character!`
                    },
                    {
                        "name": "ping",
                        "value": "Simple ping command"
                    },
                    {
                        "name": "join",
                        "value": "Gets the bot to join the voice channel"
                    },
                    {
                        "name": "leave",
                        "value": "Gets the bot to leave the voice channel"
                    },
                    {
                        "name": "play <youtube URL>",
                        "value": "Paste any youtube URL and the bot will join the voice chat and play it.\nIf theres already a song playing it will add it to a playlist\n*Note: You **must** use the **share** button to get the URL, not the URL from the web browser.*",
                    },
                    {
                        "name": "skip",
                        "value": "Skips the current song playing, if theres no next song lined up the bot will just leave the server."
                    },
                    {
                        "name": "playlist",
                        "value": "Shows info on the current song playlist"
                    },
                ]
            }
        });
    },
};