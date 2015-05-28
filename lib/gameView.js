;(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var nextGameState = function() {
      this.game.step();
      this.game.draw(this.ctx);
    };

    this.bindKeyHandlers();
    setInterval(nextGameState.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('w', function() { game.ship.power([0,-1]) });
    key('a', function() { game.ship.turn(Math.PI/6) });
    key('d', function() { game.ship.turn(-Math.PI/6) });
    key('space', function() { game.ship.fireBullet(); });
  };
})();
