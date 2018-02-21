const Discord = require("discord.js");
const CommandCollection = require("./command/collection.js").Collection;
const CommandTokenizer = require("./command/tokenizer.js").Tokenizer;
const fs = require('fs'); 

const FILE_TOKEN = 'token';
const FILE_TOKEN_ENCODING = 'utf8';

const COMMAND_DELIMETER = '!';

var token = fs.readFileSync(FILE_TOKEN, FILE_TOKEN_ENCODING);
var client = new Discord.Client();
var commands = new CommandCollection(COMMAND_DELIMETER);
var tokenizer = new CommandTokenizer();

tokenizer.addToken('command', RegExp("^" + COMMAND_DELIMETER + "[\\S]+"));
tokenizer.addToken('string', /".*"/);
tokenizer.addToken('embedded', /\{.*\}/);
tokenizer.addToken('word', /[\S]+/);

token = token.replace("\n", "");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var prospect = msg.content;
  
  if (commands.prospectHasCommand(prospect)){
    var tokens = tokenizer.tokenize(prospect);
    console.log(tokens);
  }
  
});

client.login(token);
