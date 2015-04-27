var sum = function() {
  var args = Array.prototype.slice.call(arguments);

  return args.reduce(function(prevVal, curVal){
    return prevVal + curVal;
  });
};

Function.prototype.myBind = function(obj) {
  var args = Array.prototype.slice.call(arguments,1);
  var fun = this;

  return function() {
    var args2 = Array.prototype.slice.call(arguments);
    return fun.apply(obj,args.concat(args2));
  };
};

var curriedSum = function (numArgs) {
  var args = [];

  var _curriedSum = function (num) {
    args.push(num);

    if (args.length < numArgs) {
      return _curriedSum;
    } else {
      return sum.apply(null, args);
    }
  };

  return _curriedSum;
};


Function.prototype.curry = function(numArgs) {
  var args = [];

  var _curry = function(arg) {
    args.push(arg);

    if (args.length < numArgs) {
      return _curry.bind(this);
    } else {
      return this.apply(this, args);
    }
  };

  return _curry.bind(this);
};
