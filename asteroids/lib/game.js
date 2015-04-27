;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.DIM_X = 750;
    this.DIM_Y = 750;
    this.NUM_ASTEROIDS = 4;
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.prototype.addAsteroids = function() {
    for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
      var a = new Asteroids.Asteroid(this.randomPosition(), this);
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

  Game.prototype.checkCollisions = function () {
    for(var i = 0; i < this.asteroids.length; i++) {
      for(var j = i + 1; j < this.asteroids.length; j++) {
        this.asteroids[i].isCollidedWith(this.asteroids[j]);
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];

    if (x > this.DIM_X) {
      x -= this.DIM_X;
    }
    else if (x < 0) {
      x += this.DIM_X;
    }

    if (y > this.DIM_Y) {
      y -= this.DIM_Y;
    }

    else if (y < 0) {
      y += this.DIM_Y;
    }

    return [x, y];
  };

})();
