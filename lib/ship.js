;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var RADIUS = 20;
  var COLOR = Asteroids.Util.randomColor();
  var Ship = Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(
      this,
      pos,
      [0,0],
      RADIUS,
      COLOR,
      game
    );
    this.dir = 0;

    var dx = Math.cos(Math.PI * 5/4 + this.dir) * this.radius + this.pos[0]
            - (Math.cos(Math.PI * 7/4 + this.dir) * this.radius + this.pos[0]);
    var dy = Math.sin(Math.PI * 5/4 + this.dir) * this.radius + this.pos[1]
          - (Math.sin(Math.PI * 7/4 + this.dir) * this.radius + this.pos[1]);
    this.baseDist = Math.sqrt(dx*dx + dy*dy);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    ctx.strokeStyle = this.color;
    //
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.stroke();


    if(key.isPressed("a")) { this.turn(Math.PI/20) }
    if(key.isPressed("d")) { this.turn(-Math.PI/20) }

    // triangle
    ctx.beginPath();
    ctx.moveTo(Math.cos(Math.PI/2 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI/2 + this.dir)) * this.radius + this.pos[1]);
    ctx.lineTo(Math.cos(Math.PI * 5/4 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI * 5/4 + this.dir)) * this.radius + this.pos[1]);
    ctx.lineTo(Math.cos(Math.PI * 7/4 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI * 7/4 + this.dir)) * this.radius + this.pos[1]);
    ctx.closePath();

    ctx.stroke();

    // fire - add flicker
    if(key.isPressed("w")) {
      ctx.beginPath();
      ctx.moveTo(Math.cos(Math.PI * 5/4 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI * 5/4 + this.dir)) * this.radius + this.pos[1]);
      ctx.lineTo(Math.cos(Math.PI * 3/2 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI * 3/2 + this.dir)) * this.radius + this.pos[1]);
      ctx.lineTo(Math.cos(Math.PI * 7/4 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI * 7/4 + this.dir)) * this.radius + this.pos[1]);
      ctx.closePath();

      ctx.stroke();

      // ctx.beginPath();
      // ctx.moveTo(Math.cos(Math.PI * 5/4 + this.dir) * this.radius + this.pos[0] + this.baseDist/3,
      //         -(Math.sin(Math.PI * 5/4 + this.dir)) * this.radius + this.pos[1]);
      // ctx.lineTo(Math.cos(Math.PI * 3/2 + this.dir) * this.radius + this.pos[0] + this.baseDist/2,
      //         -(Math.sin(Math.PI * 3/2 + this.dir)) * this.radius + this.pos[1] + this.radius/3);
      // ctx.lineTo(Math.cos(Math.PI * 7/4 + this.dir) * this.radius + this.pos[0] + this.baseDist/3 * 2,
      //         -(Math.sin(Math.PI * 7/4 + this.dir)) * this.radius + this.pos[1]);
      // ctx.closePath();
      //
      // ctx.stroke();
    }
  };

  Ship.prototype.move = function () {
    if(key.isPressed("w")) {
      // this.power([
      //   Math.cos(Math.PI/2 + this.dir),
      //   -(Math.sin(Math.PI/2 + this.dir))
      // ]);
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.pos = this.game.wrap(this.pos);
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    var drag = 0.15;
    if (Math.abs(this.vel[0] + impulse[0] * drag) <= 5 ) {
      this.vel[0] += impulse[0] * drag;
    }
    if (Math.abs(this.vel[1] + impulse[1] * drag) <= 5 ) {
      this.vel[1] += impulse[1] * drag;
    }
  };

  Ship.prototype.turn = function(val) {
    this.dir += val;
  };

  Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet(this.pos, this.vel, this.game);
    this.game.bullets.push(bullet);
  };

})();
