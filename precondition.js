'use-strict';
class precondition
{
  constructor (){}
  static checkArgument()
  {
    const expression = arguments[0] === null ? false : arguments[0];
    var msg = this._prepareMessage(arguments);
    if (!expression) {
      throw new Error(msg);
    }
  }
  
  static _prepareMessage() 
  {
    const argLength = arguments[0].length;
    const arg = arguments[0];
    if (argLength === 0) {
      return "Invalid usage, please supply the condition you want to check";
    }
    
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
    
    const msg = arg[1];
    let i;
    if (argLength > 2) {
      const len = arg[1].split('%s').length + 1;
      for (i=2; i<len; i++) {
        msg = msg.replace("%s", arg[i]);
      }
    }
    return msg;
  }
}