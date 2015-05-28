
;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.DIM_X = 750;
    this.DIM_Y = 750;
    this.NUM_ASTEROIDS = 2;
    this.asteroids = [];
    this.addAsteroids();
    this.NUM_STARDUST = 200;
    this.stardust = [];
    this.addStardust();
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
    this.bullets = [];
  };

  Game.prototype.addAsteroids = function() {
    for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
      var a = new Asteroids.Asteroid(this.randomPosition(), this);
      this.asteroids.push(a);
    }
  };

  Game.prototype.addStardust = function() {
    for(var i = 0; i < this.NUM_STARDUST; i++) {
      var s = new Asteroids.Stardust(this.randomPosition(), this);
      this.stardust.push(s);
    }
  };
  // alt to Ship#fireBullet adding and addAsteroids adding
  // Game.prototype.add = function (obj) {
  //   if (obj instanceof Asteroids.Asteroid) {
  //     this.asteroids.push(obj);
  //   } else if (obj instanceof Asteroids.Bullet) {
  //     this.bullets.push(obj);
  //   }
  // };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  };

  Game.prototype.removeBullet = function (bullet) {
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
  };

  Game.prototype.randomPosition = function() {
    return [Math.floor(Math.random() * this.DIM_X),
      Math.floor(Math.random() * this.DIM_Y)];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.globalAlpha = 0;
    this.stardust.forEach(function (a) {
      a.draw(ctx);
    });
    ctx.globalAlpha = 1;
    this.allObjects().forEach(function (a) {
      a.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (a) {
      a.move();
    });
    this.stardust.forEach(function (a) {
      a.move();
    });
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(obj);
      this.asteroids.splice(idx, 1);
    } else if (obj instanceof Asteroids.Bullet) {
      var idx = this.bullets.indexOf(obj);
      this.bullets.splice(idx, 1);
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
