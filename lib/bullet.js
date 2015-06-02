;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var RADIUS = 2;

  var Bullet = Asteroids.Bullet = function(pos, vel, game, player) {
    Asteroids.MovingObject.call(
      this,
      pos,
      vel,
      RADIUS,
      "#fff",
      game
    );
    this.player = player;

    window.setTimeout(function() {this.game.removeBullet(this)}.bind(this), 500);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.game.remove(obj);
      this.game.remove(this);
      return this.player;
    }
  };
})();
