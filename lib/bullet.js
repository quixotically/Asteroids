;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var RADIUS = 2;

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    Asteroids.MovingObject.call(
      this,
      pos,
      [7, 7],
      RADIUS,
      Asteroids.Util.randomColor(),
      game
    )
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
