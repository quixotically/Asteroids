;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var RADIUS = 2;

  var Stardust = Asteroids.Stardust = function(pos, game) {
    Asteroids.MovingObject.call(
      this,
      pos,
      // static vel
      [7, 7],
      RADIUS,
      Asteroids.Util.randomColor(),
      game
    );
  };

  Asteroids.Util.inherits(Stardust, Asteroids.MovingObject);
})();
