exports.Collection = function(name="", delimeter="!", commands={}, permissions={}){
  var me = this;

  me.name = name;
  me.delimeter = delimeter; 
  var commands = commands; 
  var permissions = permissions; 
  var trusted = {};

  //commands
  me.trustsCommand = function(name){    
    if(me.ownsCommand(name)){
      return true;
    }

    for (var name in trusted){
      var collection = trusted[name];

      if (collection.ownsCommand(name)){
        return true;
      }
    }

    return false;
  }

  me.ownsCommand = function(name){
    return typeof commands[name] != "undefined";
  }

  me.addCommand = function(command, permission){
    commands[command.name] = command;
    permissions[command.name] = permission;
  }

  me.removeCommand = function(name){
    delete commands[name];
    delete permissions[name];
  }

  me.getCommand = function(name){
    if (!me.ownsCommand(name)){
      for (var name in trusted){
        var collection = trusted[name];
        
        if (collection.ownsCommand(name)){
          return collection.getCommand(name);
        }
      }
    }
    return commands[name];
  }

  me.getCommandPermission = function(name){
    if (!me.ownsCommand(name)){
      for (var name in trusted){
        var collection = trusted[name];
        
        if (collection.ownsCommand(name)){
          return collection.getCommandPermission(name);
        }
      }
    }
    
    return permissions[name];
  }

  //trusting
  me.trust = function(other){
    trusted[other.name] = other;
  }

  me.untrust = function(name){
    delete trusted[name];
  }

  //prospective command
  me.prospectHasCommand = function(prospect){
    return prospect.search(new RegExp(`^${me.delimeter}`)) != -1;
  }

  me.stripProspect = function(prospect){
    return prospect.replace(new RegExp(`^${me.delimeter}`), "");
  }

  return me;
}
