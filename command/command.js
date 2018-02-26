const TYPES = require("./types.js").TYPES;

exports.Command = function(name=""){
  var me = this;

  me.name = name;

  me.execute = function(args=[]){
    return new exports.Result();
  }

  return me;
}

exports.Result = function(value="", message="", type=TYPES.STRING){
  var me = this;

  me.value = value;
  me.message = message;  
  me.type = type;

  return me;
}
