const ytdl = require("ytdl-core");
var { playlist } = require("./playlistStruct.js");

var autoDisconnectTimeout;

// BUG FOUND:
// After final song in playlist naturally ends, reuqesting another song after the final song doesnt update / play the song.

module.exports = {
    name: 'play',
    description: 'Plays a video from youtube (audio only)',
    async execute(message, args) {
        //const regex = RegExp('(?:https?:\/\/)?(?:(?:www\.|m.)?youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9-_]{11})');

        //if (message.member.roles.cache.some(role => role.name === "DJ")) {
            if (message.member.voice.channel) {

                // If the bot is not in VC OR there are no songs queued up, play the song instantly
                if (!playlist.inVC || playlist.songs.length <= 0) {
                    playlist.songs.push({url: args[0], by: message.author.tag}); // add the song to a playlist
                    PlaySong(message);
                } else {
                    // Add song to playlist 
                    playlist.songs.push(args[0]);
                    message.delete();
                    message.reply(`Song added to playlist ✅\nPlaylist length: ${playlist.songs.length} songs`);
                }

            } else {
                message.reply('You need to join a voice channel first!');
            }
        //} else {
        //    message.reply('Sorry, you dont have permission to play music.');
       // }
    },
};

async function AutoDCfromVC(message) {
    if (message.member.voice.channel) {
        playlist.inVC = false;
        playlist.playingSong = false;
        await message.member.voice.channel.leave();
    }
}

async function PlaySong(message) {
    clearTimeout(autoDisconnectTimeout);    // Resets auto-disconnect from vc timer
    const connection = await message.member.voice.channel.join();
    playlist.inVC = true;
    const dispatcher = connection.play(ytdl(`${playlist.songs[0]}`, { filter: "audioonly", quality: "lowestaudio" })); // cut out on itag: 140, seemed fine on lowest
    playlist.playingSong = true;
    // dispatcher.pause();
    dispatcher.resume();
    
    // dispatcher.setVolumeLogarithmic(1);

    message.delete(); // delete the message above
    message.channel.send(`▶ Now playing: ${playlist.songs[0].url}\n*Requested by: ${playlist.songs[0].by}*`);


    dispatcher.on('finish', () => {
        dispatcher.destroy();
        playlist.playingSong = false;
        // Remove song just played from the queue
        playlist.songs.shift(); // Removes first element from array

        // Check if we have songs left in the playlist to process
        if (playlist.songs.length != 0) {
            // play next song in the queue
            PlaySong(message);
        } else {
            autoDisconnectTimeout = setTimeout(AutoDCfromVC, 60000, message);  // Start timer to get bot to leave BC after 60s
        }


    });

    dispatcher.on("error", error => console.error(error));
}