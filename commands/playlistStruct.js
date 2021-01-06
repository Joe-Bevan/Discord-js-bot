const ytdl = require("ytdl-core");
const { timeTillAutoDisconnect } = require('../config.json');
class Playlist {
    constructor() {
        this.songs = [];
        this.inVC = false;
        this.playingSong = false;
        this.autoDisconnectTimeout;
    }

    SongCount() {
        return songs.length;
    }

    async PlaySong(message) {
        var onError = false;
        clearTimeout(this.autoDisconnectTimeout);    // Resets auto-disconnect from vc timer

        const connection = await message.member.voice.channel.join();
        this.inVC = true;

        const dispatcher = connection.play(ytdl(`${this.songs[0].url}`, { filter: "audioonly", quality: "lowestaudio" })); // cut out on itag: 140, seemed fine on lowest

        // On an error, skip to the next song
        dispatcher.on("error", error => {
            onError = true;
            message.reply("Sorry, there was an error trying to play that song.\nPlease try again using the 'Share video' URL or the URL at the top of your browser!");
            //console.error(error);
            this.SkipSong(message);
        });

        if (!onError) {
            this.playingSong = true;
            message.delete(); // delete the above message 
            message.channel.send(`▶ Now playing: ${playlist.songs[0].url}\n*Requested by: ${playlist.songs[0].by}*`);
        }
        // Remove song just played from the queue
        dispatcher.on('finish', () => {
            dispatcher.destroy();
            this.playingSong = false;

            this.songs.shift(); // Removes first element from array

            // Check if we have songs left in the playlist to process
            if (this.songs.length != 0) {
                // play next song in the queue
                this.PlaySong(message);
            } else {
                this.autoDisconnectTimeout = setTimeout(this.AutoDCfromVC, timeTillAutoDisconnect, message);
            }
        });
    }

    async SkipSong(message) {
        if (message.member.voice.channel) {
            if (this.inVC && this.playingSong) {
                if (this.songs[1] != null) {
                    message.reply("Skipping song ✅");
                    this.songs.shift(); // Remove song from queue
                    this.PlaySong(message);
                } else {
                    message.reply("No songs left in the queue. Leaving voice...");
                    this.AutoDCfromVC(message);
                }
            }
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }

    async AutoDCfromVC(message) {
        if (message.member.voice.channel) {
            playlist.inVC = false;
            playlist.playingSong = false;
            await message.member.voice.channel.leave();
        }
    }

}

var playlist = new Playlist();

module.exports = {
    playlist
}


