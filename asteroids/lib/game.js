;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.DIM_X = 750;
    this.DIM_Y = 750;
    this.NUM_ASTEROIDS = 40;
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.prototype.addAsteroids = function() {
    for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
      var a = new Asteroids.Asteroid(this.randomPosition());
      this.asteroids.push(a);
    }
  };

  Game.prototype.randomPosition = function() {
    return [Math.floor(Math.random() * this.DIM_X),
      Math.floor(Math.random() * this.DIM_Y)];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    this.asteroids.forEach(function (a) {
      a.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function (a) {
      a.move();
    });
  };

})();
