var Command;

exports.Collection = function(delimeter){
  var me = this;
  var delimeter = delimeter;
  var commands = {};  

  me.prospectHasCommand = function(prospect){
    return prospect.search(`^${delimeter}`) != -1;
  }

  me.stripProspect = function(prospect){
    return prospect.replace(new RegExp(`^${delimeter}`), "");
  }

  me.hasCommand = function(name){
    return typeof commands[name] != "undefined";
  }

  me.getCommand = function(name){
    return commands[name];
  }

  me.addCommand = function(name, command){
    commands[name] = command;
  }

  me.removeCommand = function(name){
    delete commands[name];
  }

  me.delimeter = function(set){
    if (typeof set != "undefined"){
      delimeter = set;
    }

    return delimeter;
  }

  return me;
}
