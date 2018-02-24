exports.ArrayOfStrings = function(array){
	var i;
	
	if (!Array.isArray(array))
		return false;
	
	for(i = 0; i < array.length; ++i){
		if(typeof array[i] != "string"){
			return false;
		}
	}
	
	return true;
}

if (!String.prototype.splice){
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

if(!String.prototype.replaceAll){
  String.prototype.replaceAll = function(toReplace, replaceWith){
    var result = this;
    
    while(result.search(toReplace) != -1){
      result = result.replace(toReplace, replaceWith);
    }
    
    return result;
  }

}

if (!String.prototype.format){
  String.prototype.format = function(){
    const REPLACEMENT_PREFIX = "<";
    const REPLACEMENT_SUFFIX = ">";
    var result;
    
    function formatSingle(string, replaceWith){
      var toReplace = REPLACEMENT_PREFIX + '1' + REPLACEMENT_SUFFIX;
      string = string.replaceAll(toReplace, replaceWith);
      
      return string;
    }
    
    function formatArray(string, array){
      var i;

      for(i = 0; i < array.length; ++i){
        var toReplace = REPLACEMENT_PREFIX + (i + 1).toString() + REPLACEMENT_SUFFIX;
        var replaceWith = array[i];
        string = string.replaceAll(toReplace, replaceWith);
      }
      
      return string;
    }

    if(typeof arguments[1] == "undefined"){
      var argument = arguments[0];
      
      if(exports.ArrayOfStrings(argument)){
        result = formatArray(this, argument);
      }
      else{
        result = formatSingle(this, argument);
      }
    }
    else{
      result = formatArray(this, arguments);
    }
    
    return result; 
  }
}