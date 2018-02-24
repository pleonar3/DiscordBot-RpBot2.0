const Collection = require("./collection.js").Collection;
const Tokenizer = require("./tokenizer.js").Tokenizer;

exports.Processor = function(){
  var me = this;
  
  var commandCollections = {};
  var parser;  
  var interpreter;

  me.handle = function(input){
    var prospect = input; 

    for(var k in commandCollections){
      var collection = commandCollections[k];

      if (collection.prospectHasCommand(prospect)){
        var command = commands.stripProspect(prospect);
        var parsed = parser.parse(command);
        var output = interpreter.interpret(parsed, collection);
        return output;
      }

    }

    return false;
  }

  me.addCommandCollection = function(name, commandCollection){
    commandCollections[name] = commandCollection;
  }

  me.hasCommandCollection = function(name){
    return commandCollections[name] != "undefined";
  }

  me.removeCommandCollection = function(name){
    delete commandCollections[name];
  }

  me.getCommandCollection = function(name){
    return commandCollections[name];
  }

  me.parser = function(set){
    if (typeof set != "undefined"){
      parser = set;
    }

    return parser;
  }

  me.interpreter = function(set){
    if (typeof set != "undefined"){
      interpreter = set;
    }

    return interpreter;
  }

  return me; 
}
