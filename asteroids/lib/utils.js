;(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function (Sub, Super) {
    function Surrogate () {};
    Surrogate.prototype = Super.prototype;
    Sub.prototype = new Surrogate();
  };
})();
