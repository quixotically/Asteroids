;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var RADIUS = 2;

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    Asteroids.MovingObject.call(
      this,
      pos,
      // placeholder vel - update to reflect ship's dir
      vel,
      RADIUS,
      Asteroids.Util.randomColor(),
      game
    );
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.game.remove(obj);
      this.game.remove(this);
    }
  };
})();
