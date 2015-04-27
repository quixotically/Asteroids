;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }



  var Asteroid = Asteroids.Asteroid = function(pos) {
    Asteroids.MovingObject.call(
      this,
      pos,
      Asteroid.randomVector(),
      RADIUS,
      COLOR
    );
  };


  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);


  var HEX_DIGITS = "0123456789ABCDEF"

  Asteroid.randomColor = function () {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += HEX_DIGITS[Math.floor((Math.random() * 16))];
    }

    return color;
  };
  var COLOR = Asteroid.randomColor();
  var RADIUS = 10;

  Asteroid.randomVector = function() {
    var xVec = (Math.floor(Math.random() * RADIUS) - RADIUS/2);
    var yVec = (Math.floor(Math.random() * RADIUS) - RADIUS/2);
    return [xVec, yVec];
  };
})();
