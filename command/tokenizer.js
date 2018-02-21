const Tokenizer = require("string-tokenizer");

exports.Tokenizer = function(){
  var me = this;
  var tokens = {};

  me.addToken = function(name, pattern){
    tokens[name] = pattern;
  }

  me.removeToken = function(name){
    delete tokens[name];
  }

  me.tokenize = function(raw){
    return Tokenizer()
      .input(raw)
      .tokens(tokens)
      .resolve(true);
  }

  return me;
}
