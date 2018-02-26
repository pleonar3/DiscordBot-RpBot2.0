require("../extensions");

const TOKEN_TYPES = require("./types.js").TYPES;

exports.Interpreter = function(){
  var me = this;

  const ERROR_NOT_COMMAND = "Report this error to the programmer, the problem is likely with the parser. Expected a command type at the root level of the parsed array [].";
  const ERROR_COMMAND_NOT_EXIST = "The command: '<1>' does not exist. Are you using the right trigger?";
  const ERROR_COMMAND_LACK_PERMISSION = "You don't have permission to execute the command: '<1>'. Contact an administrator if you find this to be in error.";

  function interpretCommand(member, commandToken, collection){
    var i;
    var value = commandToken.value;
    var name = value[0].value;
    var command;
    var permission;
    var args = [];

    if (!collection.trustsCommand(name)){
      throw {message: ERROR_COMMAND_NOT_EXIST.format(name)};
    } 

    command = collection.getCommand(name);
    permission = collection.getCommandPermission(name);

    if (!permission.memberHasPermission(member)){
      throw {message: ERROR_COMMAND_LACK_PERMISSION.format(name)};
    }    

    for(i = 1; i < value.length; ++i){
      var token = value[i];
      if (token.type == TOKEN_TYPES.COMMAND){
        var result = interpretCommand(member, token.value, collection);
        token.type = result.type;
        token.value = result.value;
      }
      if (token.type != TOKEN_TYPES.WHITE_SPACE){
        args.push(token);
      }
    }
 
    return command.execute(args); 
  }

  me.interpret = function(member, parsed, collection){
    var results = [];
    var i;

    for(i = 0; i < parsed.length; ++i){
      var commandToken = parsed[i];
      if(commandToken.type != TOKEN_TYPES.COMMAND){
        throw {message: ERROR_NOT_COMMAND};
      }
      results.push(interpretCommand(member, commandToken, collection));
    }

    return results;
  }

  return me;
}
