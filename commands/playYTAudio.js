const ytdl = require("ytdl-core");
var { playlist } = require("./playlistStruct.js");

module.exports = {
    name: 'play',
    description: 'Plays a video from youtube (audio only)',
    async execute(message, args) {
        //const regex = RegExp('(?:https?:\/\/)?(?:(?:www\.|m.)?youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9-_]{11})');

        if (message.member.voice.channel) {

            // If the bot is not in VC OR there are no songs queued up, play the song instantly
            if (!playlist.inVC || playlist.songs.length <= 0) {
                playlist.songs.push({ url: args[0], by: message.author.tag }); // add the song to a playlist
                playlist.PlaySong(message);
            } else {
                // Add song to playlist 
                playlist.songs.push({ url: args[0], by: message.author.tag });
                message.delete();
                message.reply(`Song added to playlist ✅\nPlaylist length: ${playlist.songs.length} songs`);
            }

        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};
