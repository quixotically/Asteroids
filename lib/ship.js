;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var RADIUS = 15;
  var COLOR = "#fff";
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
    this.firingSpeed = 20;
    this.MAX_BULLETS = 5;
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
    if(key.isPressed("space")) { this.fireBullet(); }
    ctx.strokeStyle = this.color;

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


    if(key.isPressed("a") || key.isPressed("left")) { this.turn(Math.PI/20) }
    if(key.isPressed("d") || key.isPressed("right")) { this.turn(-Math.PI/20) }

    var leftPt = [Math.cos(Math.PI * 5/4 + this.dir) * this.radius + this.pos[0],
                -(Math.sin(Math.PI * 5/4 + this.dir)) * this.radius + this.pos[1]];
    var rightPt = [Math.cos(Math.PI * 7/4 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI * 7/4 + this.dir)) * this.radius + this.pos[1]];
    // triangle
    ctx.beginPath();
    // ctx.moveTo(this.xCalc(1/2, 0, 0), this.yCalc(-1, 1/2, 0, 0));
    // ctx.lineTo(this.xCalc(5/4, 0, 0), this.yCalc(-1, 5/4, 0, 0));
    // ctx.lineTo(this.xCalc(7/4, 0, 0), this.yCalc(-1, 7/4, 0, 0));

    // closed triangle ship
    // ctx.moveTo(Math.cos(Math.PI/2 + this.dir) * this.radius + this.pos[0],
    //           -(Math.sin(Math.PI/2 + this.dir)) * this.radius + this.pos[1]);
    // ctx.lineTo(leftPt[0], leftPt[1]);
    // ctx.lineTo(rightPt[0], rightPt[1]);

    // individual lines ship
    ctx.moveTo(Math.cos(Math.PI/2 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI/2 + this.dir)) * this.radius + this.pos[1]);
    ctx.lineTo(Math.cos(Math.PI * 5/4 + this.dir) * (this.radius + 7) + this.pos[0],
            -(Math.sin(Math.PI * 5/4 + this.dir)) * (this.radius + 7) + this.pos[1]);
    ctx.moveTo(leftPt[0], leftPt[1]);
    ctx.lineTo(rightPt[0], rightPt[1]);
    ctx.moveTo(Math.cos(Math.PI * 7/4 + this.dir) * (this.radius + 7) + this.pos[0],
              -(Math.sin(Math.PI * 7/4 + this.dir)) * (this.radius + 7) + this.pos[1]);
    ctx.lineTo(Math.cos(Math.PI/2 + this.dir) * this.radius + this.pos[0],
              -(Math.sin(Math.PI/2 + this.dir)) * this.radius + this.pos[1]);
    ctx.stroke();

    // fire - add flicker
    if(key.isPressed("w") || key.isPressed("up")) {
      // ctx.beginPath();
      // ctx.moveTo(this.xCalc(5/4, 0, 0), this.yCalc(-1, 5/4, 5, 0));
      // ctx.lineTo(this.xCalc(3/2, 5, 0), this.yCalc(-1, 3/2, 5, 0));
      // ctx.lineTo(this.xCalc(7/4, 0, 0), this.yCalc(-1, 7/4, 5, 0));
      // ctx.closePath();
      //
      // ctx.stroke();
      var xMidpt = (leftPt[0] + rightPt[0])/2;
      var yMidpt = (leftPt[1] + rightPt[1])/2;

      ctx.beginPath();
      ctx.moveTo((leftPt[0] + xMidpt)/2, (leftPt[1] + yMidpt)/2);
      ctx.lineTo(Math.cos(Math.PI * 3/2 + this.dir) * (this.radius + 10) + this.pos[0],
              -(Math.sin(Math.PI * 3/2 + this.dir)) * (this.radius + 10) + this.pos[1]);
      ctx.lineTo((rightPt[0] + xMidpt)/2, (rightPt[1] + yMidpt)/2);
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
    if(key.isPressed("w") || key.isPressed("up")) {
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
    this.pos = this.game.center;
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
    if (this.game.bullets.length < this.MAX_BULLETS) {
      var pos = this.pos.slice();
      pos = [Math.cos(Math.PI/2 + this.dir) * this.radius + this.pos[0],
            -(Math.sin(Math.PI/2 + this.dir)) * this.radius + this.pos[1]];
      var vel = [Math.cos(Math.PI/2 + this.dir) * this.firingSpeed,
            -(Math.sin(Math.PI/2 + this.dir)) * this.firingSpeed]
      var bullet = new Asteroids.Bullet(pos, vel, this.game);
      this.game.bullets.push(bullet);
    }
  };

})();
