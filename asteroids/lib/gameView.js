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
      this.game.moveObjects();
      this.game.draw(this.ctx);
    };

    setInterval(nextGameState.bind(this), 20);
  };
})();
