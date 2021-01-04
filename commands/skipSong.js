const ytdl = require("ytdl-core");
var { playlist } = require("./playlistStruct.js");

var autoDisconnectTimeout;

module.exports = {
    name: 'skip',
    description: 'Skips song in playlist',
    async execute(message, args) {
        // const regex = RegExp('(?:https?:\/\/)?(?:(?:www\.|m.)?youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9-_]{11})');

        //if (message.member.roles.cache.some(role => role.name === "DJ")) {
            if (message.member.voice.channel) {

                if (playlist.inVC && playlist.playingSong) {
                    // Check if theres another song lined up
                    if (playlist.songs[1] != null) {
                        message.reply("Skipping song ✅");
                        playlist.songs.shift(); // Remove song from queue
                        PlaySong(message);
                    } else {
                        message.reply("No song left to skip to. Leaving voice...");
                        AutoDCfromVC(message);
                    }
                   
                }

            } else {
                message.reply('You need to join a voice channel first!');
            }
       // } else {
       //     message.reply('Sorry, you dont have permission to skip songs.');
        //}
    },
};

async function AutoDCfromVC(message) {
    if (message.member.voice.channel) {
        playlist.inVC = false;
        playlist.playingSong = false;
        playlist.songs = Array(); // clear playlist
        await message.member.voice.channel.leave();
    }
}

async function PlaySong(message) {
    clearTimeout(autoDisconnectTimeout);    // Resets auto-disconnect from vc timer
    const connection = await message.member.voice.channel.join();
    playlist.inVC = true;
    const dispatcher = connection.play(ytdl(`${playlist.songs[0]}`, { filter: "audioonly", quality: "lowestaudio" })); // cut out on itag: 140, seemed fine on lowest
    playlist.playingSong = true;
    //dispatcher.pause();
   // dispatcher.resume();
    dispatcher.setVolume(1);

    message.channel.send(`▶ Now playing: ${playlist.songs[0]}`);

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
            autoDisconnectTimeout = setTimeout(AutoDCfromVC, 10000, message);  // Start timer to get bot to leave BC after 60s
        }


    });
}