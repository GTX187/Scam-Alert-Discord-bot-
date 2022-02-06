const Discord = require('discord.js');
require('dotenv').config();
const dns = require('dns') // no need to install this, it is a part of Node.js

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_PRESENCES",
        "GUILD_MEMBERS"
    ],
    presence: {activities: [{type: 'WATCHING', name: 'scammers'}]},
    allowedMentions: {repliedUser: true}
});

client.on('ready', () => {
    console.log('Bot is up and ready for action!');
  });

client.login(process.env.BOT_TOKEN)

console.log(process.env.BOT_TOKEN)

client.on("message", (message) => {
    const regex = /(?<=https:\/\/)([^\/\.]*\.[^\/\.]*)/gm;
    const match = message.content.match(regex)
    if (match){
        const hostname = match[0]
        dns.lookup(hostname, (err, address, family) => {
        if(!!err){
            message.delete()
            message.author.send("Hey! You have sent a forbidden link in Test server. Please make sure this doesn't happen again.")
        }
    });
    }
});