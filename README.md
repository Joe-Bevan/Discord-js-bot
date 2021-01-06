# Discord-js-bot

A simple discord bot that can play music.
 
## Setting up this bot
### 1.) Create a new Discord Application:
If you don't know how to do this go [here](https://discord.com/developers/applications) and create a new application. Once your app is created navigate to the **Bot** tab and turn your application into a bot. At this point you'll want to copy your Discord bots token and keep it safe somewhere as we'll need it later. 
> It's vital you **do not share this token with anyone else.**

![alt text](https://github.com/Joe-Bevan/Discord-ChickenBot/blob/master/DiscordCopyToken.png "Discord token copying")


### 2.) Installing Node.js
If you don't already have Node.js installed, go [here](https://nodejs.org/en/) and download Node.js

To check you have Node.js installed correctly you can run the command `node -v` in your terminal and you should see your Node.js version show up.


### 3.) Getting the bot online:
If you have Node.js correctly installed, type `node index.js` into your terminal.  
This will create a `config.json` file, it's structured like so:
```json
config.json
{
  "prefix": ".",
  "token": "REPLACE ME WITH YOUR DISCORD TOKEN",
  "color": "0xF5A623",
  "botAvatar": "https://miro.medium.com/max/962/1*I9KrlBSL9cZmpQU3T2nq-A.jpeg",
  "timeTillAutoDisconnect": 60000
}
```
- First you **must** provide the discord bot token, you can find your discord bots token [here](https://discord.com/developers/applications)
- You can edit the prefix to summon the bot here if you wish. Just replace the "." to whatever character you like. Just check your server doesn't already have a bot using this prefix.
- You can also edit the 'timeTillAutoDisconnect'. Simply put, this is the time (in ms) the bot hangs around in the voice chat before disconnecting after the last song is played.
> Optionally you can change the color property to any valid hex color. This color is used as the accent color in some of the commands.
> You can also change the profile picture of the bot here aswell.

After you have provided your token in the `config.json` file, run the program again and you should see the bot come online.


### 4.) Using the bot:
Simply type `.help` into a discord text channel and the bot will print a list of commands. Remember if you've changed the default prefix of `.` to something else, you'll have to use the new prefix specified in the `config.json` file.
