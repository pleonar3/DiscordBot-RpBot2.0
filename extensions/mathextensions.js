if(!Math.RandomInt){
  Math.RandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}