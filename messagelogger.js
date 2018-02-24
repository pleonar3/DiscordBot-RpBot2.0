require('./stringextensions.js');
const fs = require('fs');
const mkdirp = require('mkdirp');
const CHAT_LOG_DIRECTORY = "./Logs/Chat/<1>/<2>";
const CHAT_LOG_PATH = "./Logs/Chat/<1>/<2>/<3>.txt";
const PRIVATE_MESSAGES_FOLDER = "PrivateMessages";
const PRIVATE_MESSAGE_PREFIX = "Private";
const privateMessageTypes = ['dm', 'goup'];
const guildMessageTypes = ['text', 'voice'];
const MESSAGE_PREFIX_FORMAT = "(<1>) ";

//yr-month-day 
const DATE_FORMAT_BASE = "<1>-<2>-<3>";
//hour:minute:second
const TIME_FORMAT_BASE = "<1>:<2>:<3>"

const MESSAGE_FORMAT_BASE = "[<1> <2>]: <3>\r\n";

exports.logMessage = function(msg, mirrorConsole=true){
  var path;
  var directory;
  var consoleMessagePrefix;
  const date = new Date();
  const channel = msg.channel;
  const author = msg.author;
  const authorName = author.username;
  var associatedUser = authorName;
  const content = msg.content;
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();
  const messageDate = DATE_FORMAT_BASE.format(year, month, day);
  const messageTime = TIME_FORMAT_BASE.format(hours, minutes, seconds);
  const fullMessage = MESSAGE_FORMAT_BASE.format(messageDate + " " + messageTime, authorName, content);
  
  if(privateMessageTypes.indexOf(channel.type) != -1){
    associatedUser = channel.recipient.username;
    consoleMessagePrefix = PRIVATE_MESSAGE_PREFIX;
    path = CHAT_LOG_PATH.format(PRIVATE_MESSAGES_FOLDER, associatedUser, messageDate);
    directory = CHAT_LOG_DIRECTORY.format(PRIVATE_MESSAGES_FOLDER, associatedUser);
  }
  else if (guildMessageTypes.indexOf(channel.type) != -1){
    const guildName = msg.member.guild.name;
    const channelName = channel.name;
    consoleMessagePrefix = guildName + "\\" + channelName;
    path = CHAT_LOG_PATH.format(guildName, channelName, messageDate);
    directory = CHAT_LOG_DIRECTORY.format(guildName, channelName);
  }

  mkdirp(directory, function(err) { 

    fs.appendFile(path, fullMessage, (err) => {
      if (err) throw err;
    });
      
    if (mirrorConsole){
      console.log(MESSAGE_PREFIX_FORMAT.format(consoleMessagePrefix) + fullMessage);
    }
    
    return fullMessage;

  });
}