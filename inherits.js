Function.prototype.inherits = function (SuperClass) {
  var Surrogate = function () {};

  Surrogate.prototype = SuperClass.prototype;

  this.prototype = new Surrogate();
};

function MovingObject () {};

function Ship () {};
Ship.inherits(MovingObject);

function Asteroid () {};
Asteroid.inherits(MovingObject);

var ship = new Ship();

MovingObject.prototype.fly = function () {return "I believe I can fly!!";};

Ship.prototype.soar = function () {return "I believe I can soar!!";};

Asteroid.prototype.crash = function () {return "BOOOOMMMM!!";};
