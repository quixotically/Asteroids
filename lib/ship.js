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
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    if (Math.abs(this.vel[0] + impulse[0]) <= 5 ) {
      this.vel[0] += impulse[0];
    }
    if (Math.abs(this.vel[1] + impulse[1]) <= 5 ) {
      this.vel[1] += impulse[1];
    }
  };

  Ship.prototype.turn = function(val) {
    this.dir += val;
    //console.log(this.tip);
  };

  Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet(this.pos, this.vel, this.game);
    this.game.bullets.push(bullet);
  };

})();
