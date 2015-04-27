;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.DIM_X = window.innerWidth;
    this.DIM_Y = window.innerHeight;
    this.NUM_ASTEROIDS = 40;
    this.asteroids = [];
  };

})();
