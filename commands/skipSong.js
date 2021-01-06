var { playlist } = require("./playlistStruct.js");

module.exports = {
    name: 'skip',
    description: 'Skips song in playlist',
    async execute(message, args) {
        playlist.SkipSong(message);
    },
};
