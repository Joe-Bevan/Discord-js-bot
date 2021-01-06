const { botAvatar } = require('../config.json'); // Load the prefix and token in from a external file
const { playlist } = require('./playlistStruct.js');


module.exports = {
    name: 'playlist',
    description: 'Shows info about songs in the playlist',
    execute(message, args) {

        message.channel.send({
            "embed": {
                "title": "Current playlist info",
                "description": "",
                "color": 0xF5A623, // Supports hex and weird OLE formats
                "timestamp": new Date(),
                "footer": {
                    "icon_url": botAvatar,
                    "text": "Bot made by Joe Bevan",
                },
                "author": {
                    "name": "Discord-js-Bot",
                    "url": "https://github.com/Joe-Bevan/Discord-js-bot",
                    "icon_url": botAvatar
                },
                "fields": [
                    {
                        "name": "Number of songs:",
                        "value": playlist.songs.length
                    },
                    {
                        "name": "Next song URL:",
                        "value": playlist.songs[1] ? playlist.songs[1] : "No next song"
                    }



                ]
            }
        });
    }

};
