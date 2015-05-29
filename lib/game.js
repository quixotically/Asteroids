
;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.DIM_X = 750;
    this.DIM_Y = 750;
    this.NUM_ASTEROIDS = 5;
    this.asteroids = [];
    this.addAsteroids();
    this.NUM_STARDUST = 200;
    this.stardust = [];
    this.addStardust();
    this.center = [this.DIM_X/2, this.DIM_Y/2];
    var p1SpawnPos = [this.DIM_X/4, this.DIM_Y/2];
    var p2SpawnPos = [this.DIM_X/4 * 3, this.DIM_Y/2];
    this.p1 = new Asteroids.Ship(p1SpawnPos, this, 1);
    this.p2 = new Asteroids.Ship(p2SpawnPos, this, 2);
    this.bullets1 = [];
    this.bullets2 = [];
    this.score = 0;
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
    return this.asteroids.concat(this.bullets1).concat(this.bullets2)
                         .concat(this.p1).concat(this.p2);
  };

  Game.prototype.removeBullet = function (bullet) {
    // var bullets = this.bullets1.concat(this.bullets2);
    // bullets.splice(bullets.indexOf(bullet), 1);
    if (this.bullets1.indexOf(bullet) !== -1) {this.bullets1.splice(this.bullets1.indexOf(bullet), 1)}
    else if (this.bullets2.indexOf(bullet) !== -1) {this.bullets2.splice(this.bullets2.indexOf(bullet), 1)}
  };

  Game.prototype.randomPosition = function() {
    return [Math.floor(Math.random() * this.DIM_X),
      Math.floor(Math.random() * this.DIM_Y)];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.globalAlpha = 0.35;
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
      var bulletIdx = this.bullets1.indexOf(obj);

      if (bulletIdx !== -1) {
        this.bullets1.splice(bulletIdx, 1);
      } else if (this.bullets2.indexOf(obj) !== -1) {
        var idx = this.bullets2.indexOf(obj);
        this.bullets2.splice(idx, 1);
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
