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
    key('a', function() { game.ship.power([-1,0]) });
    key('s', function() { game.ship.power([0,1]) });
    key('d', function() { game.ship.power([1,0]) });
    // key('a', function() { game.ship.turn([-1,0]) });
    // key('d', function() { game.ship.turn([1,0]) });
    key('space', function() { game.ship.fireBullet(); });
  };
})();
