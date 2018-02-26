const Discord = require("discord.js");
const Peg = require("pegjs");
const Processor = require("./command/processor.js").Processor;
const Interpreter = require("./command/interpreter.js").Interpreter;
const fs = require('fs'); 

const CollectionDefault = require("./command/collections/default.js").Default;

const FILE_TOKEN = 'token';
const FILE_TOKEN_ENCODING = 'utf8';

const FILE_PARSER = 'command/parsers/command.peg';
const FILE_PARSER_ENCODING = 'utf8';

const COMMAND_DELIMETER = '!';

const ERROR_COMMAND = "Command processing error: '<1>'";

var token = fs.readFileSync(FILE_TOKEN, FILE_TOKEN_ENCODING);
var client = new Discord.Client();
var parser = Peg.generate(fs.readFileSync(FILE_PARSER, FILE_PARSER_ENCODING));
var processor = new Processor(parser, new Interpreter()); 

processor.commandCollections[CollectionDefault.name] = CollectionDefault;

token = token.replace("\n", "");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var commandString = msg.content;
  var member = msg.member;
  var reply = [];
  if(!msg.author.bot){
    var result = false;
    try{
      result = processor.process(member, commandString);
      if(result){
        for(var i = 0; i < result.length; ++i){
          reply[i] = result[i].message;
        }
      }
    }
    catch (ex){
      reply[0] = ERROR_COMMAND.format(ex.message);
      result = true;
    }

    if(result)
      msg.reply(reply.join("\r\n"));
  }
});

client.login(token);
