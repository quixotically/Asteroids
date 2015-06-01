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
    this.interval = setInterval(nextGameState.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('up', function() {  return false });
    key('left', function() { return false });
    key('right', function() { return false });
  };
})();
