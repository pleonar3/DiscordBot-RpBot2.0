const Command = require("../command.js").Command;
const Result = require("../command.js").Result;
const Permission = require("../permission.js").Permission;
const TYPES = require("../types.js").TYPES;

const COMMAND_NAME = "echo";

const ERROR_TYPE_NOT_STRING = "Required a string. Argument type supplied: <1>.";

exports.Echo = new Command(COMMAND_NAME); 

exports.Echo.execute = function(args=[]){
  if (args.length == 0){
    return new Result("", "", TYPES.STRING);  
  }  

  var arg = args[0];

  if (arg.type != TYPES.STRING){
    throw {message: ERROR_TYPE_NOT_STRING.format(arg.type)};
  }

  return new Result(arg.value, arg.value, TYPES.STRING);
}

exports.Permission = new Permission("*");
