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

  var COLOR = "#fff";
  var RADIUS = 20;

  Asteroid.prototype.draw = function (ctx) {
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.stroke();
  };

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
