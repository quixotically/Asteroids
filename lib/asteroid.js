;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos, game) {
    Asteroids.MovingObject.call(
      this,
      pos,
      Asteroid.randomVector(),
      RADIUS,
      COLOR,
      game
    );
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  var COLOR = Asteroids.Util.randomColor();
  var RADIUS = 20;

  Asteroid.randomVector = function() {
    var xVec = (Math.floor(Math.random() * RADIUS) - RADIUS/2);
    var yVec = (Math.floor(Math.random() * RADIUS) - RADIUS/2);
    return [xVec, yVec];
  };

  Asteroid.prototype.collideWith = function(obj) {
    if (obj instanceof Asteroids.Ship) {
      obj.relocate();
    }
  };

})();
