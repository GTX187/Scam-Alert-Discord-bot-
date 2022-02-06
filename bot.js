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
    count=0
  });

client.login(process.env.BOT_TOKEN)

console.log(process.env.BOT_TOKEN)

client.on("message", async (message) => {
    const regex = /(?<=https:\/\/)([^\/\.]*\.[^\/\.]*)/gm;
    const match = message.content.match(regex)
    if (match){
        const hostname = match[0]
        try {
            await dns.promises.lookup(hostname);
        } catch {
            await message.author.send("Hey! You have sent a forbidden link. Please make sure this doesn't happen again or else you will be banned.").catch(console.error);
        
            if (!message.guild) return;
            await message.delete(); 
        
            const member = message.guild.members.cache.get(message.author.id);
            if (!member) return;

            if (count==1) {
            await message.author.send("Hey! You hae been banned from the server since you have violated the previous warning.");
                    
            await member.ban(); 
            return;
            }

            count+=1
            await member.kick();  

             
        }
        
    };
})
