class precondition
{
  constructor (){}
  static checkArgument()
  {
    var expression = arguments[0] === null ? false : arguments[0];
    var msg = this._prepareMessage(arguments);
    if (!expression) {
      throw TypeError(msg);
    }
  }
  
  /*static checkNotNull()
  {
    checkArgument(arguments[0]!==null);
    var expression;
    var msg = this._prepareMessage(arguments);
    if (!expression) {
      throw TypeError(msg);
    }
  }*/
  
  static _prepareMessage() 
  {
    var argLength = arguments[0].length;
    var arg = arguments[0];
    if (argLength === 0) {
      return "Invalid usage, please supply the condition you want to check";
    }
    
    //move to the necessary check method
    if (typeof(arg[0]) !== 'boolean') {
        return "The argument expression must be Boolean";
    }
    
    if (typeof(arg[1]) !== 'string') {
      return "The message expression must be String";
    }
    
    if (argLength == 2 && arg[1].includes("%s")) {
      return "The error message contain indicator with no parameter to match.";
    }
    
    if (arg[1].split('%s').length != argLength - 1) {
      return "The number of indicators are not equal to " +
        "the number of parameters.";
    }
    
    var msg = arg[1];
    var i;
    if (argLength > 2) {
      const len = arg[1].split('%s').length + 1;
      for (i=2; i<len; i++) {
        msg = msg.replace("%s", arg[i]);
      }
    }
    return msg;
  }
}