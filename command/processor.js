const Collection = require("./collection.js").Collection;

exports.Processor = function(parser, interpreter, commandCollections={}){
  var me = this;

  me.parser = parser;
  me.interpreter = interpreter;  
  me.commandCollections=commandCollections;

  const ERROR_PARSER = "Error parsing command: '<1>'."
  const ERROR_INTERPRETER = "Error interpreting command: '<1>'"

  me.process = function(member, input){
    var prospect = input; 

    for(var k in commandCollections){
      var collection = commandCollections[k];

      if (collection.prospectHasCommand(prospect)){
        var command = collection.stripProspect(prospect);
        
        try{
          var parsed = parser.parse(command);
        } 
        catch(ex){
          throw {message: ERROR_PARSER.format(ex.message)};
        }
     
        try{
          var output = interpreter.interpret(member, parsed, collection);
        }
        catch(ex){
          throw {message: ERROR_INTERPRETER.format(ex.message)};
        }

        return output;
      }

    }

    return false;
  }

  return me; 
}
