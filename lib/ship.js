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
    this.bulletSpeed = 7;
    // var dx = this.xCalc(5/4, 0, 0) - this.xCalc(7/4, 0, 0);
    // var dy = this.yCalc(1, 5/4, 0, 0) - this.yCalc(1, 7/4, 0, 0);

    var dx = Math.cos(Math.PI * 5/4 + this.dir) * this.radius + this.pos[0]
            - (Math.cos(Math.PI * 7/4 + this.dir) * this.radius + this.pos[0]);
    var dy = Math.sin(Math.PI * 5/4 + this.dir) * this.radius + this.pos[1]
          - (Math.sin(Math.PI * 7/4 + this.dir) * this.radius + this.pos[1]);
    this.baseDist = Math.sqrt(dx*dx + dy*dy);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.stroke();


    if(key.isPressed("a")) { this.turn(Math.PI/20) }
    if(key.isPressed("d")) { this.turn(-Math.PI/20) }

    // triangle
    ctx.beginPath();
    // ctx.moveTo(this.xCalc(1/2, 0, 0), this.yCalc(-1, 1/2, 0, 0));
    // ctx.lineTo(this.xCalc(5/4, 0, 0), this.yCalc(-1, 5/4, 0, 0));
    // ctx.lineTo(this.xCalc(7/4, 0, 0), this.yCalc(-1, 7/4, 0, 0));

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
      // ctx.beginPath();
      // ctx.moveTo(this.xCalc(5/4, 0, 0), this.yCalc(-1, 5/4, 5, 0));
      // ctx.lineTo(this.xCalc(3/2, 5, 0), this.yCalc(-1, 3/2, 5, 0));
      // ctx.lineTo(this.xCalc(7/4, 0, 0), this.yCalc(-1, 7/4, 5, 0));
      // ctx.closePath();
      //
      // ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(Math.cos(Math.PI * 5/4 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI * 5/4 + this.dir)) * this.radius + this.pos[1]);
      ctx.lineTo(Math.cos(Math.PI * 3/2 + this.dir) * (this.radius + 5) + this.pos[0],
              -(Math.sin(Math.PI * 3/2 + this.dir)) * (this.radius + 5) + this.pos[1]);
      ctx.lineTo(Math.cos(Math.PI * 7/4 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI * 7/4 + this.dir)) * this.radius + this.pos[1]);
      ctx.closePath();

      ctx.stroke();
    }
  };

  // Ship.prototype.xCalc = function (radianFract, len, trans) {
  //   console.log("hello");
  //   Math.cos(Math.PI * radianFract + this.dir) * (this.radius + len) + this.pos[0] + trans;
  // };
  //
  // Ship.prototype.yCalc = function (sign, radianFract, len, trans) {
  //   sign * (Math.sin(Math.PI * radianFract + this.dir)) * (this.radius + len) + this.pos[1] + trans;
  // };

  Ship.prototype.move = function () {
    if(key.isPressed("w")) {
      this.power([
        Math.cos(Math.PI/2 + this.dir),
        -(Math.sin(Math.PI/2 + this.dir))
      ]);
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
    if (Math.abs(this.vel[0] + impulse[0] * drag) <= 10 ) {
      this.vel[0] += impulse[0] * drag;
    }
    if (Math.abs(this.vel[1] + impulse[1] * drag) <= 10 ) {
      this.vel[1] += impulse[1] * drag;
    }
  };

  Ship.prototype.turn = function(val) {
    this.dir += val;
  };

  Ship.prototype.fireBullet = function() {
    var pos = this.pos.slice();
    pos = [Math.cos(Math.PI/2 + this.dir) * this.radius + this.pos[0],
          -(Math.sin(Math.PI/2 + this.dir)) * this.radius + this.pos[1]];
    var vel = [Math.cos(Math.PI/2 + this.dir) * this.bulletSpeed,
          -(Math.sin(Math.PI/2 + this.dir)) * this.bulletSpeed]
    var bullet = new Asteroids.Bullet(pos, vel, this.game);
    this.game.bullets.push(bullet);
  };

})();
