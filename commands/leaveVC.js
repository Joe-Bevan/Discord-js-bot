// BUG: STOP ALL MUSIC / RESET PLAYLIST
var playlistStruct = require("./playlistStruct.js");

module.exports = {
    name: 'leave',
    description: 'Gets the bot to leave the voice chat!',
    async execute(message, args) {
        if (message.member.voice.channel) {
            playlistStruct.songs = []; // Clear song list
            playlistStruct.songs.length = 0;
            playlistStruct.inVC = false;
            playlistStruct.playingSong = false;
            await message.member.voice.channel.leave();
            return;
        } else {
            message.reply('You need to join a voice channel first!');
            return; // Dont want to process other commands
        }
    },
};