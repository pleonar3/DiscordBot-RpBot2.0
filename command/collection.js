var Command;

exports.Collection = function(delimeter){
  var me = this;
  var delimeter = delimeter;
  var commands = {};  

  me.prospectHasCommand = function(prospect){
    return prospect.search(`^${delimeter}`) != -1;
  }

  me.hasCommand = function(command){
    if (typeof command == "string"){
      return commands[command];
    }

    else if (command instanceof Command){
      return commands[command.name()];
    }

    return false;
  }

  me.addCommand = function(command){
    if (command instanceof Command){
      commands[command.name()] = command;
    }
  }

  me.removeCommand = function(command){
    if (typeof command == "string"){
      delete commands[command];
    }

    else if (command instanceof Command){
      delete commands[command.name()];
    }

  }

  me.delimeter = function(set){
    if (typeof set != "undefined"){
      delimeter = set;
    }

    return delimeter;
  }

  return me;
}
