require('./extensions');

exports.Interpreter = function(){
  var me = this;

  const TYPE_COMMAND = 'command';
  const TYPE_STRING = 'string';
  const TYPE_WORD = 'word';
  const TYPE_NUMBER = 'number';
  const TYPE_WHITE_SPACE = 'whitespace';

  const ERROR_NOT_COMMAND = 'Report this error to the programmer, the problem is likely with the parser. Expected a command type at the root level.';

  me.interpret = function(parsed, collection){
    var i;

    for(i = 0; i < parsed.length; ++i){
      if(parsed[i].type != TYPE_COMMAND){
        throw ERROR_NOT_COMMAND;
      }
    }
  }

  return me;
}
