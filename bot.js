const Discord = require("discord.js");
const fs = require('fs'); 

const FILE_TOKEN = 'token';
const FILE_TOKEN_ENCODING = 'utf8';

var token = fs.readFileSync(FILE_TOKEN, FILE_TOKEN_ENCODING);
var client = new Discord.Client();

token = token.replace("\n", "");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token);
