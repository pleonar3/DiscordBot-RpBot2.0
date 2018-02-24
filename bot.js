const Discord = require("discord.js");
const Peg = require("pegjs");
const CommandCollection = require("./command/collection.js").Collection;
const fs = require('fs'); 

const FILE_TOKEN = 'token';
const FILE_TOKEN_ENCODING = 'utf8';

const FILE_PARSER = 'command/parsers/command.peg';
const FILE_PARSER_ENCODING = 'utf8';

const COMMAND_DELIMETER = '!';

var token = fs.readFileSync(FILE_TOKEN, FILE_TOKEN_ENCODING);
var client = new Discord.Client();
var commands = new CommandCollection(COMMAND_DELIMETER);
var parser = Peg.generate(fs.readFileSync(FILE_PARSER, FILE_PARSER_ENCODING));

token = token.replace("\n", "");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var prospect = msg.content;
  
  if (commands.prospectHasCommand(prospect)){
    var command = commands.stripProspect(prospect);
    var parsed = parser.parse(command);
    msg.reply(JSON.stringify(parsed));
  }
  
});

client.login(token);
