
;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  Asteroids.DIM_X = $(window).width();
  Asteroids.DIM_Y = $(window).height();

  $(window).resize(function() {
    Asteroids.DIM_X = $(window).width();
    Asteroids.DIM_Y = $(window).height();
    $("canvas").attr("width", Asteroids.DIM_X);
    $("canvas").attr("height", Asteroids.DIM_Y);
  });

  var Game = Asteroids.Game = function () {
    this.NUM_ASTEROIDS = 5;
    this.asteroids = [];
    this.addAsteroids();
    this.NUM_STARDUST = 200;
    this.stardust = [];
    this.addStardust();
    this.center = [Asteroids.DIM_X/2, Asteroids.DIM_Y/2];
    var p1SpawnPos = [Asteroids.DIM_X/4, Asteroids.DIM_Y/2];
    var p2SpawnPos = [Asteroids.DIM_X/4 * 3, Asteroids.DIM_Y/2];
    this.p1 = new Asteroids.Ship(p1SpawnPos, this, 1, "#80D0FF");
    this.p2 = new Asteroids.Ship(p2SpawnPos, this, 2, "#E8AA94");
    this.bullets1 = [];
    this.bullets2 = [];
    this.score1 = 0;
    this.score2 = 0;
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
    return [Math.floor(Math.random() * Asteroids.DIM_X),
      Math.floor(Math.random() * Asteroids.DIM_Y)];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);
    if (this.isOver()) {
      window.clearInterval(Asteroids.currentGameView.interval);
      $("canvas").html();
      $(".game-over-screen").removeClass("hidden");
      $(".score1").append(this.score1);
      $(".score2").append(this.score2);
    } else {
      ctx.globalAlpha = 0.2;
      this.stardust.forEach(function (a) {
        a.draw(ctx);
      });
      ctx.globalAlpha = 1;
      this.allObjects().forEach(function (a) {
        a.draw(ctx);
      });
    }
  };

  Game.prototype.isOver = function () {
    return this.p1.lives < 0 && this.p2.lives < 0;
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

    if (x > Asteroids.DIM_X) {
      x -= Asteroids.DIM_X;
    }
    else if (x < 0) {
      x += Asteroids.DIM_X;
    }

    if (y > Asteroids.DIM_Y) {
      y -= Asteroids.DIM_Y;
    }

    else if (y < 0) {
      y += Asteroids.DIM_Y;
    }

    return [x, y];
  };
})();
