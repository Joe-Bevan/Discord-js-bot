module.exports = {
    name: 'join',
    description: 'Gets the bot to join the voice chat!',
    async execute(message, args) {
        if (message.member.voice.channel) {
            vcConnection = await message.member.voice.channel.join();
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};