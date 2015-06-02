;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var COLOR = "#fff";
  var RADIUS = 20;

  var Asteroid = Asteroids.Asteroid = function(pos, game, radius) {
    radius = typeof radius !== 'undefined' ?  radius : RADIUS;
    Asteroids.MovingObject.call(
      this,
      pos,
      Asteroid.randomVector(),
      radius,
      COLOR,
      game
    );
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

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
    var xVec = (Math.floor(Math.random() * RADIUS) - RADIUS/2) + 1;
    var yVec = (Math.floor(Math.random() * RADIUS) - RADIUS/2) + 1;
    return [xVec, yVec];
  };

  Asteroid.prototype.collideWith = function(obj) {
    if (obj instanceof Asteroids.Ship) {
      obj.relocate();
    }
  };

})();
