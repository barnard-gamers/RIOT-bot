require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.content.trim().split(" ")[0].slice(2, message.content.trim().split(" ")[0].length - 1) === client.user.id) {
    if (message.member.roles.find(role => role.name === "Admin" || role.name === "Owner")) {
      if (message.content.trim().split(" ").length >= 2) {
        const botRole = message.guild.roles.find(role => role.name === "BOT");
        let target = await message.content.trim().split(" ")[1];
        target = await client.users.find(user => user.username === target);
        if (target && target.bot) {
          message.guild.members.find(member => member.id === target.id).addRole(botRole, `Requested by ${message.author}`);
          if (!message.guild.members.find(member => member.id === target.id).roles.find(role => role.name === "BOT")) {
          } else {
            message.reply("That bot already has BOT role!");
          }
        } else {
          message.reply("The target doesn't exists or not a bot!");
        }
      } else {
        message.reply("You have tell me who I have to add role!");
      }
    } else {
      message.reply("Only admins are able to request for bot permission!");
    }
  }
});

client.login(process.env.BOT_TOKEN);
client.on('error', console.error);
